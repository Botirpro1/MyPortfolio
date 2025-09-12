import React from "react"

function cn(...a) {
  return a.filter(Boolean).join(" ")
}

const variants = {
  primary: "bg-emerald-500 text-neutral-900 hover:bg-emerald-400",
  secondary: "bg-white/10 text-white hover:bg-white/15",
  outline: "border border-white/20 text-white hover:border-white/40",
  ghost: "text-white hover:bg-white/10",
}

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
}

export default function Button({
  as: As = "button",
  variant = "primary",
  size = "md",
  animated = true,
  className = "",
  disabled = false,
  children,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium select-none " +
    "outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-0 transition"
  const motion = animated ? "hover:-translate-y-0.5 active:translate-y-0" : ""
  const cursor = disabled ? "opacity-50 pointer-events-none" : "cursor-pointer"

  return (
    <As
      className={cn(base, motion, cursor, variants[variant], sizes[size], className)}
      disabled={As === "button" ? disabled : undefined}
      {...rest}
    >
      {children}
    </As>
  )
}