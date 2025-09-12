
function cn(...a) {
  return a.filter(Boolean).join(" ")
}

const variants = {
  filled: "bg-white/5 border-white/10",
  outline: "bg-transparent border-white/20",
  ghost: "bg-transparent border-transparent",
}

const radii = {
  md: "rounded-xl",
  lg: "rounded-2xl",
}

export default function Card({
  as: As = "div",
  variant = "filled",
  radius = "lg",
  className = "",
  children,
  ...rest
}) {
  return (
    <As
      className={cn(
        "border backdrop-blur-sm text-white/90",
        variants[variant],
        radii[radius],
        className
      )}
      {...rest}
    >
      {children}
    </As>
  )
}