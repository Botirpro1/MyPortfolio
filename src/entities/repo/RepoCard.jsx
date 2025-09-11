export default function RepoCard({ repo }) {
  const { name, description, html_url, homepage, stargazers_count, forks_count, language, owner } = repo;
  const og = `https://opengraph.githubassets.com/1/${owner?.login}/${name}`;

  return (
    <article className="repo">
      <a href={homepage || html_url} target="_blank" rel="noreferrer" className="thumb-wrap">
        <img src={og} alt={name} className="thumb" loading="lazy" />
      </a>
      <div className="repo-body">
        <h3 className="repo-title"><a href={html_url} target="_blank" rel="noreferrer">{name}</a></h3>
        <p className="repo-desc">{description || "Без описания"}</p>
        <div className="repo-meta">
          {language && <span className="chip">{language}</span>}
          <span className="muted">★ {stargazers_count}</span>
          <span className="muted">⑂ {forks_count}</span>
          {homepage && <a className="btn small" href={homepage} target="_blank" rel="noreferrer">Demo</a>}
        </div>
      </div>
    </article>
  );
}
