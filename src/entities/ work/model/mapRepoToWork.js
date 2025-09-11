export function mapRepoToWork(repo = {}) {
  const owner = repo.owner?.login || null
  const name = repo.name || repo.full_name?.split('/')?.[1] || 'repo'

  return {
    id: repo.id ?? `${owner ?? 'me'}-${name}`,
    title: beautifyName(name),
    description: repo.description ?? '',
    topics: repo.topics ?? [],
    stars: repo.stargazers_count ?? 0,
    language: repo.language ?? null,
    htmlUrl: repo.html_url ?? (owner ? `https://github.com/${owner}/${name}` : '#'),
    homepage: repo.homepage || null,
    previewImage: pickOgPreview(owner, name),
    updatedAt: repo.pushed_at || repo.updated_at || repo.created_at || null,
  }
}

function beautifyName(name = '') {
  // Преобразуем my-cool_repo → "My Cool Repo"
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase())
}

function pickOgPreview(owner, name) {
  if (!owner || !name) return null
  // OpenGraph превью от GitHub. Можно подменить на локальную картинку, если нужно.
  return `https://opengraph.githubassets.com/1/${owner}/${name}`
}
