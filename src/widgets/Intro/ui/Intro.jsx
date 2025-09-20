import FallingCodeBackground from "@/widgets/Intro/ui/FallingCodeBackground"
import Button from "@/shared/ui/button/Button"
import assets from "@/shared/assets/index"

export default function Intro() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">



      <FallingCodeBackground
        background="var(--bg)"
        density={1.8}
        lineHeight={1.3}
        spawnEveryMs={220}
        decayMs={1800}
        fontSize={12}
        opacity={0.35}
        tailMax={26}
        symbols={[
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
        ]}
      />
      <FallingCodeBackground
        background="transparent"
        density={1.9}
        lineHeight={1.5}
        spawnEveryMs={200}
        decayMs={18000}
        fontSize={10}
        opacity={0.35}
        tailMax={100}
        symbols={[
          "1", "0"
        ]}
      />

      <div className="relative z-10 text-center p-10">
        <img src={assets.IconStrategix} className="mx-auto w-[700px]" alt="logo" />
        <p className="mt-4 text-lg text-white/70">Frontend — magic. Graphic — power.</p>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
    </section>
  )
}