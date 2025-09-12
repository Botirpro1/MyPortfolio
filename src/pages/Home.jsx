import Intro from "@/widgets/Intro/ui/Intro"
import Works from "@/widgets/Works/Works"

export default function Home() {
  return (
    <>
      <Intro />

      <section id="about" className="scroll-mt-[72px] min-h-screen px-6 py-24">
        {/* ...контент About me... */}
      </section>

      <section id="frontend" className="scroll-mt-[72px] min-h-screen px-6 py-24">
        {/* ...Frontend / Works с фильтрами... */}
        <Works />
      </section>

      <section id="graphic" className="scroll-mt-[72px] min-h-screen px-6 py-24">
        {/* ...Graphic design... */}
      </section>

      <section id="contact" className="scroll-mt-[72px] min-h-screen px-6 py-24">
        {/* ...Contact form... */}
      </section>
    </>
  )
}