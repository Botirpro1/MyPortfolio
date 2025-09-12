import React from "react"

function cn(...a) {
  return a.filter(Boolean).join(" ")
}

export default function Input({
  type = "text",
  size = "md",
  className = "",
  disabled = false,
  ...rest
}) {
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-4 text-lg",
  }

  return (
    <input
      type={type}
      disabled={disabled}
      className={cn(
        "w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 " +
          "focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/40 transition",
        sizes[size],
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-text",
        className
      )}
      {...rest}
    />
  )
}