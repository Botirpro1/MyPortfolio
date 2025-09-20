import assets from "@/shared/assets/index";
import Intro from "@/widgets/Intro/ui/Intro"
import Works from "@/widgets/Works/Works"

export default function Home() {
  return (
    <>
      <Intro />

      <section id="about" className="scroll-mt-[72px] min-h-screen px-6">
        <div className="about__content container flex gap-8 pt-100">
          <img src={assets.Hero} alt="" className="h-auto w-auto" />
          <div className="descr__hero flex flex-col">
            <p className="font-medium text-left text-white">
              <span className="text-[100px] font-medium text-left text-white leading-none">I am</span>
              <span className="text-[150px] font-medium text-left text-white leading-none"> Botir</span>
            </p>
            <p className="text-[45px] font-normal text-left text-white">
              Frontend Developer & Graphic Designer.
            </p>
            <p className="w-[1193px] text-[28px] font-light text-justify text-white my-35">
              I craft modern, responsive websites with clean code and intuitive design. My focus is on creating
              digital products that combine functionality with strong visual identity. As a graphic designer, I
              bring creativity and attention to detail, ensuring every project is both technically solid and
              visually engaging.
            </p>
          </div>
        </div>
      </section>

      <section id="frontend" className="scroll-mt-[72px] min-h-screen px-6 py-24">
        <h2 class="text-[10vw]w-full font-medium text-left text-white">FRONTEND — DEVELOPING</h2>
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