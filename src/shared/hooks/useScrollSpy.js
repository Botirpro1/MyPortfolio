import { useEffect, useState } from "react"

export default function useScrollSpy(
  ids = [],
  { rootMargin = "-40% 0px -60% 0px" } = {}
) {
  const [active, setActive] = useState(ids[0] || null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { root: null, rootMargin, threshold: 0.01 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, rootMargin])

  return active
}