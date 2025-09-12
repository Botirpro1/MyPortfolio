import React from "react";
import Button from "@/shared/ui/button/Button.jsx";
import Card from "@/shared/ui/card/Card.jsx";

const VARIANTS = {
  filled: "bg-white/5 border-white/10",
  outline: "bg-transparent border-white/20",
  ghost: "bg-transparent border-transparent",
};
const SIZES = {
  sm: { pad: "p-3", img: "w-28 h-20 md:w-36 md:h-24", title: "text-sm md:text-base" },
  md: { pad: "p-4", img: "w-40 h-28 md:w-48 md:h-32", title: "text-base md:text-lg" },
  lg: { pad: "p-6", img: "w-56 h-36 md:w-64 md:h-40", title: "text-lg md:text-xl" },
};

export default function WorkCard({
  work = {},
  variant = "filled",          // 'filled' | 'outline' | 'ghost'
  size = "md",                 // 'sm' | 'md' | 'lg'
  animated = true,            // hover-приподнимание
  compact = false,            // горизонтальная компактная раскладка
  showPreview = true,         // показывать превью-изображение
  className = "",
}) {
  const { title, description, topics = [], stars = 0, language, htmlUrl, homepage, previewImage } = work;

  const v = VARIANTS[variant] || VARIANTS.filled;
  const s = SIZES[size] || SIZES.md;
  const hover = animated ? "transition-transform hover:-translate-y-0.5 hover:shadow-lg" : "";

  return (
    <Card className={`${s.pad} ${v} border rounded-2xl backdrop-blur-sm ${hover} ${className}`}>
      <div className={`flex ${compact ? "flex-row gap-4" : "flex-col gap-4"} md:flex-row`}>
        {showPreview && (
          <div className={`relative shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-emerald-400/15 to-cyan-400/10 ${s.img}`}>
            {previewImage ? (
              <img src={previewImage} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            ) : (
              <FallbackPreview title={title} />
            )}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2 justify-between">
            <h3 className={`${s.title} font-semibold leading-tight line-clamp-2`}>{title}</h3>
            {language && (
              <span className="ml-2 text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10">{language}</span>
            )}
          </div>

          {description && <p className="mt-2 text-sm md:text-[15px] text-white/75 line-clamp-3">{description}</p>}

          {topics?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {topics.slice(0, 4).map((t) => (
                <span key={t} className="text-[11px] px-2 py-1 rounded-md bg-white/5 border border-white/10">
                  #{t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center gap-2">
            <Star count={stars} />
            {htmlUrl && (
              <Button as="a" href={htmlUrl} target="_blank" rel="noreferrer" variant="ghost" size="sm">
                Repo
              </Button>
            )}
            {homepage && (
              <Button as="a" href={homepage} target="_blank" rel="noreferrer" variant="primary" size="sm">
                Live
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

function FallbackPreview({ title = "" }) {
  const initials =
    title
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "PR";
  return (
    <div className="absolute inset-0 grid place-items-center">
      <span className="text-2xl font-bold text-emerald-300/80">{initials}</span>
    </div>
  );
}
function Star({ count = 0 }) {
  return (
    <div className="inline-flex items-center gap-1 text-xs text-white/80 select-none">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
        <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848 1.416 8.268L12 19.771l-7.416 4.093L6 15.596 0 9.748l8.332-1.73z" />
      </svg>
      <span>{count}</span>
    </div>
  );
}