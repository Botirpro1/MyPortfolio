import { useEffect, useState } from 'react'
import WorkCard from '@/entities/work/ui/WorkCard.jsx'
import { getRepos } from '@/shared/lib/github.js'
import { mapRepoToWork } from '@/entities/work/model/mapRepoToWork.js'

export default function Works() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        setError('')
        const user = 'Botirpro1' // TODO: replace with your login
        const repos = await getRepos({ user, perPage: 12 })
        const works = repos.map(mapRepoToWork)
        if (!cancelled) setItems(works)
      } catch (e) {
        if (!cancelled) setError(e.message || 'Ошибка загрузки репозиториев')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-6 py-16" id="works">
      <header className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold">Worx</h2>
        <p className="mt-2 text-white/70">Последние проекты с GitHub</p>
      </header>

      {loading && <div className="text-white/70">Загружаю репозитории…</div>}
      {error && <div className="text-red-400">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((work) => (
            <WorkCard key={work.id} work={work} animated />
          ))}
        </div>
      )}
    </section>
  )
}
