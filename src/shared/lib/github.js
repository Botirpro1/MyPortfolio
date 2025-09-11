import axios from 'axios'

const token = import.meta.env.VITE_GH_TOKEN

export const gh = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
  // optional: you can tune timeout, etc.
})

const memCache = new Map()


export async function ghGet(path, params = {}) {
  const url = gh.defaults.baseURL + path + '?' + new URLSearchParams(params)
  if (memCache.has(url)) return memCache.get(url)

  const { data } = await gh.get(path, { params })
  memCache.set(url, data)
  return data
}

export async function getRepos({ user, sort = 'pushed', perPage = 12, page = 1, type = 'owner' } = {}) {
  if (!user) throw new Error('getRepos: param `user` is required')
  return ghGet(`/users/${encodeURIComponent(user)}/repos`, {
    sort,
    per_page: perPage,
    page,
    type,
  })
}
export async function searchRepos({ q, sort = 'updated', order = 'desc', perPage = 12, page = 1 } = {}) {
  if (!q) throw new Error('searchRepos: param `q` is required')
  const data = await ghGet(`/search/repositories`, {
    q,
    sort,
    order,
    per_page: perPage,
    page,
  })
  return data.items || []
}