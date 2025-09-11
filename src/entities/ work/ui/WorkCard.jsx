import React from 'react'
import Button from '@/shared/ui/button/Button.jsx'
import Card from '@/shared/ui/card/Card.jsx'

/**
 * Карточка работы. Управляемая через пропсы, без жёсткой анимации.
 * Микро-hover включается флагом `animated`.
 */
export default function WorkCard({
  work,
  variant = 'default',     // 'default' | 'outline' | 'ghost'
  size = 'md',             // 'sm' | 'md' | 'lg'
  animated = true,
  compact = false,
}) {
  const {
    title, description, topics = [], stars = 0, language,
    htmlUrl, homepage, previewImage
  } = work || {}

  const hover = animated ? 'hover:-translate-y-0.5 hover:shadow-lg transition-transform' : ''
  const pad = size === 'sm' ? 'p-3' : size === 'lg' ? 'p-6' : 'p-4'

  return (
    <Card className={`${pad} ${hover} bg-white/3 border border-white/10 rounded-2xl backdrop-blur-sm`}> 
      <div className={`flex ${compact ? 'flex-row gap-4' : 'flex-col gap-4'} md:flex-row`}>
        {/* Превью */}
        <div className={`relative shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-400/15 to-cyan-400/10 ${compact ? 'w-28 h-20' : 'w-40 h-28'} md:w-48 md:h-32`}>
          {previewImage ? (
            <img src={previewImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover" loading="lazy"/>
          ) : (
            <FallbackPreview title={title} />
          )}
        </div>

        {/* Тело */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2 justify-between">
            <h3 className="text-base md:text-lg font-semibold leading-tight line-clamp-2">{title}</h3>
            {language && (
              <span className="ml-2 text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">{language}</span>
            )}
          </div>
          {description && (
            <p className="mt-2 text-sm md:text-[15px] text-white/75 line-clamp-3">{description}</p>
          )}

          {topics?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {topics.slice(0, 4).map((t) => (
                <span key={t} className="text-[11px] px-2 py-1 rounded-md bg-white/5 border border-white/10">#{t}</span>
              ))}
            </div>
          )}

          {/* Футер */}
          <div className="mt-4 flex items-center gap-2">
            <Star count={stars} />
            {htmlUrl && (
              <Button as="a" href={htmlUrl} target="_blank" rel="noreferrer" variant="ghost" size="sm">Repo</Button>
            )}
            {homepage && (
              <Button as="a" href={homepage} target="_blank" rel="noreferrer" variant="primary" size="sm">Live</Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

function FallbackPreview({ title = '' }) {
  const initials = title.split(' ').slice(0, 2).map(w => w[0]?.toUpperCase()).join('') || 'PR'
  return (
    <div className="absolute inset-0 grid place-items-center">
      <span className="text-2xl font-bold text-emerald-300/80">{initials}</span>
    </div>
  )
}

function Star({ count = 0 }) {
  return (
    <div className="inline-flex items-center gap-1 text-xs text-white/80 select-none">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-90"><path d="M12 .587l3.668 7.431L24 9.748l-6 5.848 1.416 8.268L12 19.771l-7.416 4.093L6 15.596 0 9.748l8.332-1.73z"/></svg>
      <span>{count}</span>
    </div>
  )
}
