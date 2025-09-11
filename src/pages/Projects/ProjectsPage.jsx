import RepoGallery from "@/widgets/RepoGallery/RepoGallery.jsx";

export default function ProjectsPage() {
  return (
    <section className="card">
      <h2>Проекты</h2>
      <p className="muted">Список автоматически подгружается с GitHub.</p>
      <RepoGallery username="Botir" />
    </section>
  );
}
