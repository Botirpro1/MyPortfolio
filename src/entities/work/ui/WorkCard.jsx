import React from "react"
import Card from "@/shared/ui/card/Card.jsx"
import Button from "@/shared/ui/button/Button.jsx"

export default function WorkCard({ work, className = "" }) {
  if (!work) return null
  const { title, description, language, htmlUrl, homepage, previewImage, stars = 0, topics = [] } = work

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex gap-4">
        <div className="relative w-40 h-28 shrink-0 overflow-hidden rounded-xl bg-white/5 border border-white/10">
          {previewImage ? (
            <img src={previewImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-emerald-300/80 text-xl font-bold">
              {title?.[0]?.toUpperCase() || "P"}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base md:text-lg font-semibold leading-tight line-clamp-2">{title}</h3>
            {language && <span className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10">{language}</span>}
          </div>

          {description && <p className="mt-1 text-sm text-white/75 line-clamp-3">{description}</p>}

          {topics?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {topics.slice(0, 4).map((t) => (
                <span key={t} className="text-[11px] px-2 py-1 rounded-md bg-white/5 border border-white/10">
                  #{t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-white/80 select-none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.431L24 9.748l-6 5.848 1.416 8.268L12 19.771l-7.416 4.093L6 15.596 0 9.748l8.332-1.73z"/></svg>
              {stars}
            </span>
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
  )
}