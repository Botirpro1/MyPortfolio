export default async function getUserRepos(username) {
  const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
  return res.json();
}
