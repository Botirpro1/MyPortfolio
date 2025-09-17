import { useEffect, useRef } from "react"

const DEFAULT_SYMBOLS = [
  "const", "break", "useState", "null", "return", "props", "map", "=>", "className", "<div/>",
]

export default function FallingCodeBackground({
  background = "#000",      // фон канваса, можно "transparent"
  density = 1.0,            // чем больше, тем ближе колонки
  lineHeight = 1.25,        // межстрочный множитель от fontSize
  spawnEveryMs = 160,       // ритм появления НОВОГО слова в колонке
  decayMs = 1400,           // за сколько ms строка полностью погаснет
  fontSize = 18,
  fontFamily = "ui-monospace, SFMono-Regular, Menlo, monospace",
  opacity = 0.4,            // непрозрачность «головы» (новой строки)
  // tailMax больше не нужен — у нас фиксированная сетка
  symbols = DEFAULT_SYMBOLS,
  className = "",
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const c = canvasRef.current
    const ctx = c.getContext("2d", { alpha: false }) // чёрный фон — непрозрачный канвас

    const BG = "#000"
    const DPR = Math.max(1, window.devicePixelRatio || 1)

    // шаги сетки
    const stepY = Math.max(6, Math.floor(fontSize * lineHeight))
    const baseStepX = Math.max(16, Math.floor(fontSize * 1.8))
    const stepXFromDensity = (d) =>
      Math.max(12, Math.floor(baseStepX / Math.max(0.2, d))) // больше density => меньше шаг X

    // состояние
    let w = 0, h = 0
    let cols = 0, rows = 0
    let stepX = 0

    // на колонку: x, headRow, timer, prevWord, words[], ages[]
    let colX = []
    let headRow = []
    let timer = []
    let prevWord = []
    /** @type {string[][]} */ let words = []
    /** @type {number[][]} */ let ages = []

    function pickNext(prev) {
      if (symbols.length <= 1) return symbols[0] || ""
      let next = prev
      let guard = 0
      while (next === prev && guard < 12) {
        next = symbols[(Math.random() * symbols.length) | 0]
        guard++
      }
      return next
    }

    function setup() {
      // размеры/DPI
      w = c.clientWidth
      h = c.clientHeight
      c.width = Math.floor(w * DPR)
      c.height = Math.floor(h * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)

      // шрифт
      ctx.font = `${fontSize}px ${fontFamily}`
      ctx.textBaseline = "top"

      // сетка
      stepX = stepXFromDensity(density)
      cols = Math.max(1, Math.floor(w / stepX))
      rows = Math.max(1, Math.ceil(h / stepY) + 4) // всегда покрываем экран + небольшой запас

      //alloc
      colX = new Array(cols)
      headRow = new Array(cols)
      timer = new Array(cols)
      prevWord = new Array(cols)
      words = new Array(cols)
      ages = new Array(cols)

      for (let i = 0; i < cols; i++) {
        colX[i] = Math.floor((i + 0.5) * stepX)

        words[i] = new Array(rows)
        ages[i] = new Array(rows)
        // случайная фаза «головы»
        headRow[i] = (Math.random() * rows) | 0
        timer[i] = Math.random() * spawnEveryMs
        prevWord[i] = ""

        // PREFILL: вся колонка заполнена разными словами с рандомным возрастом
        for (let r = 0; r < rows; r++) {
          const wrd = pickNext(prevWord[i])
          prevWord[i] = wrd
          words[i][r] = wrd
          ages[i][r] = Math.random() * decayMs
        }
      }
    }

    let last = performance.now()

    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000) // сек
      last = now

      // фон
      if (background === "transparent") {
        ctx.clearRect(0, 0, w, h)
      } else {
        ctx.fillStyle = background
        ctx.fillRect(0, 0, w, h)
      }

      for (let i = 0; i < cols; i++) {
        // тик таймера спавна
        timer[i] += dt * 1000
        while (timer[i] >= spawnEveryMs) {
          timer[i] -= spawnEveryMs
          // следующая строка для перезаписи
          headRow[i] = (headRow[i] + 1) % rows
          const next = pickNext(prevWord[i])
          prevWord[i] = next
          words[i][headRow[i]] = next
          ages[i][headRow[i]] = 0 // новая строка — «голова»
        }

        // обновление возраста + рендер от головы по кругу (не обязательно, можно 0..rows-1)
        for (let r = 0; r < rows; r++) {
          // индекс строки, начиная от головы вниз по хвосту
          const idx = (headRow[i] - r + rows) % rows
          ages[i][idx] += dt * 1000

          // прозрачность: глава ярче, хвост — по времени
          const isHead = (idx === headRow[i])
          const fade = Math.max(0, 1 - ages[i][idx] / decayMs)
          const a = isHead ? opacity : opacity * Math.min(0.85, fade)
          if (a <= 0) continue

          ctx.fillStyle = `rgba(255,255,255,${a})`
          const y = (idx * stepY) // фиксированная сетка
          if (y < -stepY || y > h + stepY) continue
          ctx.fillText(words[i][idx], colX[i], y)
        }
      }

      rafRef.current = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(setup)
    ro.observe(c)
    setup()
    last = performance.now()
    rafRef.current = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [density, lineHeight, spawnEveryMs, decayMs, fontSize, fontFamily, opacity, symbols])

  return (
    <div className={`pointer-events-none absolute inset-0 z-0 ${className}`} style={{ background }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}