
// import { useMemo } from "react"
// import { useTheme } from "@/app/providers/theme"

// const DEFAULT_PHRASES = [
//   "<div>", "</div>", "<span>", "</span>", "<button>", "<input>", "<form>", "<img />",
//   "<a>", "</a>", "className", "id", "href", "src", "alt", "title",
//   "onClick", "onChange", "value", "placeholder", "return", "const", "let", "import",
//   "export", "async", "await", "fetch()", "try {} catch {}", "map()", "filter()",
//   "JSON", "true", "false", "null", "undefined",
//   "color:", "background:", "display: flex", "gap:", "padding:", "margin:", "border:",
//   "width:", "height:", "z-index", "position: fixed", "top: 0", "left: 0", "right: 0", "bottom: 0",
//   "/home", "/about", "/login", "useMemo(() =>", "useState()", "useEffect(() =>",
//   "redux", "context", "props", "children", "{props}", "<Component />", "e.target.value",
//   "for()", "while()", "if() {}", "else {}", "switch() {}", "case", "break", "continue",
//   "console.log()", "git push", "git commit -m", "npm i", "yarn add", "npm run dev", "npx create-react-app",
// ]

// function randomLightColor() {
//   const l = 20 + Math.random() * 20
//   return `hsl(0, 0%, ${l}%)`
// }
// function randomDarkColor() {
//   const hue = 60 + (Math.random() * 80 - 40)
//   return `hsl(${hue}, 80%, 80%)`
// }
// function rand(min, max) { return Math.random() * (max - min) + min }
// function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

// export default function FallingCodeBackground({
//   density = 44,
//   speedRange = [24, 40],
//   phrases = DEFAULT_PHRASES,
// }) {
//   const { theme } = useTheme()

//   const items = useMemo(() => {
//     return Array.from({ length: density }).map((_, i) => {
//       const text = pick(phrases)
//       const color = theme === "light" ? randomLightColor() : randomDarkColor()
//       const x = rand(0, 100)
//       const duration = rand(speedRange[0], speedRange[1])
//       const delay = -rand(0, duration)
//       const scale = rand(0.6, 1.0)
//       const blurPx = -1 + 2 * Math.pow(1 / scale, 2)
//       const opacity = rand(0.6, 1)
//       const fontSize = rand(16, 36)
//       const weight = Math.random() < 0.55 ? 500 : 700
//       return { id: i, text, color, x, delay, scale, blurPx, opacity, duration, fontSize, weight }
//     })
//     // важно: зависимость от theme, чтобы перекрасить сразу
//   }, [density, phrases, speedRange, theme])

//   return (
//     <div
//       style={{
//         position: "absolute",
//         inset: 0,
//         zIndex: 0,
//         overflow: "hidden",
//         pointerEvents: "none",
//         background: "transparent",
//       }}
//     >
//       <div style={{ position: "absolute", inset: "-20vh" }}>
//         {items.map((it) => (
//           <span
//             key={it.id}
//             style={{
//               position: "absolute",
//               left: `${it.x}vw`,
//               top: `-20vh`,
//               fontSize: it.fontSize,
//               fontWeight: it.weight,
//               color: it.color,
//               opacity: it.opacity,
//               whiteSpace: "nowrap",
//               display: "inline-block",
//               transform: `scale(${it.scale})`,
//               filter: `blur(${it.blurPx}px)`,
//               textShadow:
//                 theme === "dark"
//                   ? `0 0 10px ${it.color}40, 0 0 22px ${it.color}30`
//                   : "none",
//             }}
//           >
//             <span
//               style={{
//                 display: "inline-block",
//                 animation: `codeFall ${it.duration}s linear ${it.delay}s infinite`,
//                 transformOrigin: "50% 50%",
//               }}
//             >
//               {it.text}
//             </span>
//           </span>
//         ))}
//       </div>

//       <style>{`
// @keyframes codeFall {
//   0%   { transform: translate3d(0, -120vh, 0); opacity: 0; }
//   8%   { opacity: 1; }
//   92%  { opacity: 1; }
//   100% { transform: translate3d(0,  140vh, 0); opacity: 0; }
// }
//       `}</style>
//     </div>
//   )
// }

// // import { useEffect, useRef } from "react"

// // const DEFAULT_SYMBOLS = [
// //   "const", "useEffect", "props", "state", "<div/>", "=>", "map()", "return", "import", "export",
// // ]

// // /**
// //  * Code rain with explicit head/tail control
// //  * - Black background
// //  * - Letters are white @ 40% opacity
// //  * - Only the head has a slight shadow glow
// //  */
// // export default function FallingCodeBackground({
// //   density = 0.9,           // 0.3..2  how many columns relatively
// //   speed = 160,             // px/sec   fall speed
// //   font = 18,               // px       base font size
// //   tail = 8,                // how many trail steps to draw (0..20)
// //   headShadowBlur = 4,      // px       subtle head glow
// //   headShadowOpacity = 0.25,// 0..1     subtle head glow opacity
// //   symbols = DEFAULT_SYMBOLS,
// //   direction = "down",      // 'down'|'up'
// //   changeEveryMs = 140,     // change symbol every N ms (readability)
// //   className = "",
// // }) {
// //   const canvasRef = useRef(null)
// //   const rafRef = useRef(0)

// //   useEffect(() => {
// //     const c = canvasRef.current
// //     const ctx = c.getContext("2d", { alpha: false }) // opaque for perf

// //     // colors
// //     const BASE_COLOR = "rgba(255,255,255,0.4)" // white @ 40%
// //     const BG_COLOR = "#000"                     // solid black

// //     let w = 0, h = 0
// //     let colW = Math.max(12, Math.floor(font * 1.2))
// //     let cols = 0

// //     // per-column state
// //     let heads = []   // y position of head (in px)
// //     let tails = []   // arrays of previous head positions
// //     let words = []   // current word for each column
// //     let wordTimers = [] // ms accumulator to control symbol change rate

// //     const DPR = Math.max(1, window.devicePixelRatio || 1)

// //     function resize() {
// //       w = c.clientWidth
// //       h = c.clientHeight
// //       c.width  = Math.floor(w * DPR)
// //       c.height = Math.floor(h * DPR)
// //       ctx.setTransform(DPR, 0, 0, DPR, 0, 0)

// //       colW = Math.max(12, Math.floor(font * 1.2))
// //       cols = Math.max(1, Math.ceil((w / colW) * density))

// //       heads = new Array(cols)
// //       tails = new Array(cols)
// //       words = new Array(cols)
// //       wordTimers = new Array(cols)

// //       for (let i = 0; i < cols; i++) {
// //         heads[i] = Math.random() * -h
// //         tails[i] = []
// //         words[i] = symbols[(Math.random() * symbols.length) | 0]
// //         wordTimers[i] = 0
// //       }

// //       ctx.font = `${font}px ui-monospace, SFMono-Regular, Menlo, monospace`
// //       ctx.textBaseline = "top"
// //     }

// //     // time-based loop
// //     let last = performance.now()

// //     function frame(now) {
// //       const dt = Math.min(0.05, (now - last) / 1000) // seconds
// //       last = now

// //       // clear to solid black (no cumulative blur/shadows on tail)
// //       ctx.fillStyle = BG_COLOR
// //       ctx.fillRect(0, 0, w, h)

// //       // draw each column explicitly: tail first (no shadow), then head (with small shadow)
// //       for (let i = 0; i < cols; i++) {
// //         const x = i * colW

// //         // update symbol timer (so words don't flicker too fast)
// //         wordTimers[i] += dt * 1000
// //         if (wordTimers[i] >= changeEveryMs) {
// //           words[i] = symbols[(Math.random() * symbols.length) | 0]
// //           wordTimers[i] = 0
// //         }

// //         // push previous head to tail
// //         if (tail > 0) {
// //           const arr = tails[i]
// //           arr.unshift(heads[i])
// //           if (arr.length > tail) arr.pop()
// //         }

// //         // move head
// //         const dir = direction === "up" ? -1 : 1
// //         heads[i] += dir * speed * dt

// //         // wrap
// //         if (direction === "down") {
// //           if (heads[i] > h + 20) heads[i] = -Math.random() * h * 0.5
// //         } else {
// //           if (heads[i] < -60) heads[i] = h + Math.random() * h * 0.5
// //         }

// //         // tail: draw previous positions, fading, NO SHADOW
// //         ctx.shadowBlur = 0
// //         for (let k = 0; k < tails[i].length; k++) {
// //           const y = tails[i][k]
// //           const fade = Math.max(0, 1 - (k + 1) / (tail + 1)) // 0..1
// //           ctx.fillStyle = `rgba(255,255,255,${0.4 * fade})`
// //           ctx.fillText(words[i], x, y)
// //         }

// //         // head: draw current word with a subtle glow
// //         ctx.shadowColor = `rgba(255,255,255,${headShadowOpacity})`
// //         ctx.shadowBlur = headShadowBlur
// //         ctx.fillStyle = BASE_COLOR
// //         ctx.fillText(words[i], x, heads[i])
// //       }

// //       rafRef.current = requestAnimationFrame(frame)
// //     }

// //     const ro = new ResizeObserver(resize)
// //     ro.observe(c)
// //     resize()
// //     last = performance.now()
// //     rafRef.current = requestAnimationFrame(frame)

// //     return () => {
// //       cancelAnimationFrame(rafRef.current)
// //       ro.disconnect()
// //     }
// //   }, [density, speed, font, tail, headShadowBlur, headShadowOpacity, symbols, direction, changeEveryMs])

// //   return (
// //     <div className={`pointer-events-none absolute inset-0 z-0 ${className}`} style={{ background: "#000" }}>
// //       <canvas ref={canvasRef} className="w-full h-full" />
// //     </div>
// //   )
// // }
import { useEffect, useRef } from "react"

const DEFAULT_SYMBOLS = [
  "const", "break", "useState", "null", "return", "props", "map", "=>", "className", "<div/>",
]

/**
 * Static-line code rain (no movement) — words appear line-by-line and fade out
 * - Black background
 * - No blur/shadow
 * - New word is generated at fixed vertical steps; previous words stay in place and fade over time
 *
 * Props:
 *  - density        : number   — horizontal density (affects X spacing). Higher = closer columns
 *  - lineHeight     : number   — vertical spacing multiplier (relative to fontSize)
 *  - speed          : number   — how fast new lines appear (px/sec equivalent via spawnEveryMs)
 *  - spawnEveryMs   : number   — cadence of spawning a new word in each column
 *  - decayMs        : number   — how long it takes a word to fade to 0 opacity
 *  - fontSize       : number   — px
 *  - fontFamily     : string   — CSS font family
 *  - opacity        : number   — 0..1 base opacity for the newest word
 *  - tailMax        : number   — max number of lines kept per column (for perf)
 *  - symbols        : string[] — vocabulary to pick from (next always differs from previous)
 */
export default function FallingCodeBackground({
  density = 1.0,
  lineHeight = 1.25,
  spawnEveryMs = 160,     // каждые N мс в колонке рождается новая «строка»
  decayMs = 1400,         // за сколько мс старая строка полностью исчезает
  fontSize = 18,
  fontFamily = "ui-monospace, SFMono-Regular, Menlo, monospace",
  opacity = 0.4,
  tailMax = 24,
  symbols = DEFAULT_SYMBOLS,
  className = "",
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const c = canvasRef.current
    const ctx = c.getContext("2d", { alpha: false })

    const BG_COLOR = "#000"

    // geometry
    let w = 0, h = 0
    const DPR = Math.max(1, window.devicePixelRatio || 1)

    // derived spacing
    const stepY = Math.max(6, Math.floor(fontSize * lineHeight))           // vertical grid step
    const baseStepX = Math.max(16, Math.floor(fontSize * 1.8))             // nominal horizontal step
    const stepXFromDensity = (d) => Math.max(12, Math.floor(baseStepX / Math.max(0.2, d)))

    // columns state
    let cols = 0
    let colX = []          // x for each column
    let colOffsetY = []    // base Y offset per column (so they start at different heights)
    let colCount = []      // how many lines already spawned in this column
    let colTimer = []      // ms accumulator to decide when to spawn next line
    let colWords = []      // array of arrays: entries with { y, text, age }
    let colPrev = []       // previous word to avoid duplicates

    function pickNext(prev) {
      if (symbols.length <= 1) return symbols[0] || ""
      let next = prev
      let guard = 0
      while (next === prev && guard < 8) {
        next = symbols[(Math.random() * symbols.length) | 0]
        guard++
      }
      return next
    }

    function setup() {
      // size
      w = c.clientWidth
      h = c.clientHeight
      c.width  = Math.floor(w * DPR)
      c.height = Math.floor(h * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)

      // font
      ctx.font = `${fontSize}px ${fontFamily}`
      ctx.textBaseline = "top"

      // columns based on density => controls X spacing, not count directly
      const stepX = stepXFromDensity(density)                // higher density => smaller spacing
      cols = Math.max(1, Math.floor(w / stepX))

      colX = new Array(cols)
      colOffsetY = new Array(cols)
      colCount = new Array(cols)
      colTimer = new Array(cols)
      colWords = new Array(cols)
      colPrev = new Array(cols)

      for (let i = 0; i < cols; i++) {
        colX[i] = Math.floor((i + 0.5) * stepX)
        colOffsetY[i] = -Math.random() * h * 0.6          // старт немного выше, чтобы не синхронно
        colCount[i] = 0
        colTimer[i] = Math.random() * spawnEveryMs        // разная фаза запуска
        colWords[i] = []
        colPrev[i] = ""
      }
    }

    let last = performance.now()

    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      // clear
      ctx.fillStyle = BG_COLOR
      ctx.fillRect(0, 0, w, h)

      for (let i = 0; i < cols; i++) {
        // spawn cadence per column
        colTimer[i] += dt * 1000
        while (colTimer[i] >= spawnEveryMs) {
          colTimer[i] -= spawnEveryMs

          const text = pickNext(colPrev[i])
          colPrev[i] = text

          const y = colOffsetY[i] + colCount[i] * stepY
          colCount[i]++

          // reset when passed bottom
          if (y > h + stepY) {
            colOffsetY[i] = -stepY * (Math.floor(tailMax * 0.6) + Math.floor(Math.random() * 6))
            colCount[i] = 0
            colWords[i] = []
          } else {
            // push new head (age=0)
            colWords[i].unshift({ y, text, age: 0 })
            // clamp tail
            if (colWords[i].length > tailMax) colWords[i].pop()
          }
        }

        // age & draw (newest -> oldest)
        const list = colWords[i]
        for (let k = 0; k < list.length; k++) {
          const e = list[k]
          e.age += dt * 1000
          const fade = Math.max(0, 1 - e.age / decayMs)
          if (fade <= 0) continue
          const a = k === 0 ? opacity : opacity * Math.min(0.85, fade)
          if (e.y < -stepY || e.y > h + stepY) continue

          ctx.fillStyle = `rgba(255,255,255,${a})`
          ctx.fillText(e.text, colX[i], e.y)
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
  }, [density, lineHeight, spawnEveryMs, decayMs, fontSize, fontFamily, opacity, tailMax, symbols])

  return (
    <div className={`pointer-events-none absolute inset-0 z-0 ${className}`} style={{ background: "#000" }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
