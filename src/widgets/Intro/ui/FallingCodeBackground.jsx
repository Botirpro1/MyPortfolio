import { useMemo } from "react"
import { useTheme } from "@/app/providers/theme"

const DEFAULT_PHRASES = [
  "<div>", "</div>", "<span>", "</span>", "<button>", "<input>", "<form>", "<img />",
  "<a>", "</a>", "className", "id", "href", "src", "alt", "title",
  "onClick", "onChange", "value", "placeholder", "return", "const", "let", "import",
  "export", "async", "await", "fetch()", "try {} catch {}", "map()", "filter()",
  "JSON", "true", "false", "null", "undefined",
  "color:", "background:", "display: flex", "gap:", "padding:", "margin:", "border:",
  "width:", "height:", "z-index", "position: fixed", "top: 0", "left: 0", "right: 0", "bottom: 0",
  "/home", "/about", "/login", "useMemo(() =>", "useState()", "useEffect(() =>",
  "redux", "context", "props", "children", "{props}", "<Component />", "e.target.value",
  "for()", "while()", "if() {}", "else {}", "switch() {}", "case", "break", "continue",
  "console.log()", "git push", "git commit -m", "npm i", "yarn add", "npm run dev", "npx create-react-app",
]

function randomLightColor() {
  const l = 20 + Math.random() * 20
  return `hsl(0, 0%, ${l}%)`
}
function randomDarkColor() {
  const hue = 60 + (Math.random() * 80 - 40)
  return `hsl(${hue}, 80%, 80%)`
}
function rand(min, max) { return Math.random() * (max - min) + min }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

export default function FallingCodeBackground({
  density = 44,
  speedRange = [24, 40],
  phrases = DEFAULT_PHRASES,
}) {
  const { theme } = useTheme()

  const items = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      const text = pick(phrases)
      const color = theme === "light" ? randomLightColor() : randomDarkColor()
      const x = rand(0, 100)
      const duration = rand(speedRange[0], speedRange[1])
      const delay = -rand(0, duration)
      const scale = rand(0.6, 1.0)
      const blurPx = -1 + 2 * Math.pow(1 / scale, 2)
      const opacity = rand(0.6, 1)
      const fontSize = rand(16, 36)
      const weight = Math.random() < 0.55 ? 500 : 700
      return { id: i, text, color, x, delay, scale, blurPx, opacity, duration, fontSize, weight }
    })
    // важно: зависимость от theme, чтобы перекрасить сразу
  }, [density, phrases, speedRange, theme])

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <div style={{ position: "absolute", inset: "-20vh" }}>
        {items.map((it) => (
          <span
            key={it.id}
            style={{
              position: "absolute",
              left: `${it.x}vw`,
              top: `-20vh`,
              fontSize: it.fontSize,
              fontWeight: it.weight,
              color: it.color,
              opacity: it.opacity,
              whiteSpace: "nowrap",
              display: "inline-block",
              transform: `scale(${it.scale})`,
              filter: `blur(${it.blurPx}px)`,
              textShadow:
                theme === "dark"
                  ? `0 0 10px ${it.color}40, 0 0 22px ${it.color}30`
                  : "none",
            }}
          >
            <span
              style={{
                display: "inline-block",
                animation: `codeFall ${it.duration}s linear ${it.delay}s infinite`,
                transformOrigin: "50% 50%",
              }}
            >
              {it.text}
            </span>
          </span>
        ))}
      </div>

      <style>{`
@keyframes codeFall {
  0%   { transform: translate3d(0, -120vh, 0); opacity: 0; }
  8%   { opacity: 1; }
  92%  { opacity: 1; }
  100% { transform: translate3d(0,  140vh, 0); opacity: 0; }
}
      `}</style>
    </div>
  )
}