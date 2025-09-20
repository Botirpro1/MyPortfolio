import { useEffect, useRef, useState } from "react"
import ThemeToggle from "@/features/theme-toggle/ThemeToggle"
import useScrollSpy from "@/shared/hooks/useScrollSpy"

const NAV_HEIGHT = 72

const SECTIONS = [
  { id: "about", label: "About me" },
  { id: "frontend", label: "Frontend" },
  { id: "graphic", label: "Graphic design" },
  { id: "contact", label: "Contact me" },
]

export default function NavBar() {
  const active = useScrollSpy(SECTIONS.map((s) => s.id))
  const navRef = useRef(null)
  const underlineRef = useRef(null)
  const [underline, setUnderline] = useState({ left: 0, width: 0 })

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  const measure = (el) => {
    if (!el) return { left: 0, width: 0 }
    return { left: el.offsetLeft, width: el.offsetWidth }
  }

  const moveTo = (el) => {
    const m = measure(el)
    setUnderline(m)
    // retrigger bounce class for CSS animation (you style it externally)
    if (underlineRef.current) {
      underlineRef.current.classList.remove("u-bounce")
      requestAnimationFrame(() => underlineRef.current?.classList.add("u-bounce"))
    }
  }

  // click -> move underline immediately + smooth scroll
  const onLinkClick = (id) => (e) => {
    e.preventDefault()
    moveTo(e.currentTarget)
    scrollToSection(id)
  }

  // when active section (from scroll spy) changes, move underline under its link
  useEffect(() => {
    if (!navRef.current || !active) return
    const link = navRef.current.querySelector(`a[href="#${active}"]`)
    if (link) moveTo(link)
  }, [active])

  // initial position + handle resize
  useEffect(() => {
    const first = navRef.current?.querySelector("a")
    if (first) moveTo(first)
    const onResize = () => {
      const current = navRef.current?.querySelector(`a[href="#${active}"]`) || first
      if (current) moveTo(current)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <header className="fixed w-full flex items-center justify-center top-0 z-40 h-[72px] backdrop-blur-[20px]">
      <nav ref={navRef} className="relative flex items-center justify-between gap-12">
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={onLinkClick(id)}
            className="relative text-sm text-white/80 hover:text-white transition px-1"
          >
            {label}
          </a>
        ))}
        {/* Moving underline. Style it in your CSS (no inline styles). */}
        <span
          ref={underlineRef}
          className="nav-underline"
          style={{
            // Only dynamic values go here as CSS variables; all visuals live in your CSS file
            "--u-left": `${underline.left}px`,
            "--u-width": `${underline.width}px`,
          }}
        />
        <ThemeToggle size={30} />
      </nav>
    </header>
  )
}