import React, { useState } from "react"

function cn(...a) {
  return a.filter(Boolean).join(" ")
}

export function Tabs({ tabs = [], defaultIndex = 0, onChange, className = "" }) {
  const [active, setActive] = useState(defaultIndex)

  const handleClick = (i) => {
    setActive(i)
    if (onChange) onChange(i)
  }

  return (
    <div className={cn("inline-flex rounded-xl bg-white/5 p-1", className)}>
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition",
            i === active
              ? "bg-emerald-500 text-neutral-900"
              : "text-white hover:bg-white/10"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}