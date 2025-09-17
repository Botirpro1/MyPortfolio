import ThemeButton from "@/features/theme-toggle/ThemeToggle"
import useScrollSpy from "@/shared/hooks/useScrollSpy"

const NAV_HEIGHT = 72 // высота хедера в px (подгони под свой)

const SECTIONS = [
  { id: "about", label: "About me" },
  { id: "frontend", label: "Frontend" },
  { id: "graphic", label: "Graphic design" },
  { id: "contact", label: "Contact me" },
]

export default function NavBar() {
  const active = useScrollSpy(SECTIONS.map((s) => s.id))

  const go = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  return (
    <header className="flex items-center justify-center top-0 z-40 h-[72px] backdrop-blur">
        <nav className="flex items-center justify-between gap-8">
          {SECTIONS.map(({ id, label }) => {
            const isActive = active === id
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={go(id)}
                className="relative text-sm text-white/80 hover:text-white transition"
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-white/80 transition-transform ${
                    isActive ? "scale-x-100" : ""
                  }`}
                />
              </a>
            )
          })}
          <ThemeButton />
        </nav>
      
    </header>
  )
}