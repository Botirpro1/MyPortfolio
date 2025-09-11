import { assets } from "@/assets";


export default function AboutPage() {
  const skills = ["Illustrator", "Photoshop", "After Effects", "Blender", "HTML", "CSS", "JS (React)", "Git"];

  return (
    <section className="card container">
      <h2>О себе</h2>
      <p>
        Люблю аккуратные интерфейсы, типографику и понятный код. Постепенно добавляю новые проекты.
      </p>

      <div className="chips" style={{ marginTop: 12 }}>
        {skills.map((s) => <span key={s} className="chip">{s}</span>)}
      </div>

      <div style={{display:"flex", justifyContent:"center", alignItems:"center", width: "250px", height: "250px", marginTop: 16 , borderRadius: "50%",overflow: "hidden", border: "1px solid var(--border)"}}>
        <img src={assets.me} alt="Me" style={{ width: "450px" }} />
      </div>

      <ul className="contacts">
        <li><a href="mailto:your.email@example.com">your.email@example.com</a></li>
        <li>Ташкент, Узбекистан</li>
        <li><a target="_blank" rel="noreferrer" href="https://t.me/yourusername">Telegram</a></li>
        <li><a target="_blank" rel="noreferrer" href="https://github.com/Botir">GitHub</a></li>
      </ul>
    </section>
  );
}