import { useEffect, useRef } from "react";
import assets from "@/shared/assets/index";
import Intro from "@/widgets/Intro/ui/Intro"
import Works from "@/widgets/Works/Works"

export default function Home() {
  return (
    <>
      <Intro />
      
{/* 
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
            <p className="text-[28px] font-light text-justify text-white my-35">
              I craft modern, responsive websites with clean code and intuitive design. My focus is on creating
              digital products that combine functionality with strong visual identity. As a graphic designer, I
              bring creativity and attention to detail, ensuring every project is both technically solid and
              visually engaging.
            </p>
          </div>
        </div>
      </section> */}

      <section id="frontend" className="scroll-mt-[72px] min-h-screen px-6 py-24 container">
        {/* ...Frontend development... */}
        <FitTitle className="text-white">FRONTEND — DEVELOPING</FitTitle>
        <Works />
      </section>

      <section id="graphic" className="scroll-mt-[72px] min-h-screen px-6 py-24 container">
        {/* ...Graphic design... */}
        <FitTitle className="text-white">GRAPHIC - DESIGN</FitTitle>
        <Works />
      </section>

      <section id="contact" className="scroll-mt-[72px] min-h-screen px-6 py-24 container">
        {/* ...Contact form... */}
        <FitTitle className="text-white">FRONTEND — DEVELOPING</FitTitle>
        <Works />
      </section>
    </>
  )
}

function FitTitle({ children, className = "" }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title) return;

    const fit = () => {
      const MIN = 24;
      const MAX = 200;
      const target = container.clientWidth;

      let low = MIN, high = MAX;
      for (let i = 0; i < 18; i++) {
        const mid = (low + high) / 2;
        title.style.fontSize = mid + "px";
        if (title.scrollWidth <= target) low = mid; else high = mid;
      }
      title.style.fontSize = Math.floor(low) + "px";
    };

    const ro = new ResizeObserver(fit);
    ro.observe(container);
    window.addEventListener("load", fit);
    window.addEventListener("resize", fit);
    fit();

    return () => {
      ro.disconnect();
      window.removeEventListener("load", fit);
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <div ref={containerRef} className="container mx-auto px-0">
      <h1
        ref={titleRef}
        className={
          "inline-block max-w-full leading-[0.9] font-extrabold tracking-tight whitespace-nowrap " +
          className
        }
      >
        {children}
      </h1>
    </div>
  );
}