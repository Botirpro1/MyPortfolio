import FallingCodeBackground from "@/widgets/Intro/ui/FallingCodeBackground"
import Button from "@/shared/ui/button/Button"
import assets from "@/shared/assets/index"

export default function Intro() {
  return (
    <section className="relative mi n-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      <FallingCodeBackground density={0.85} speed={1} phrasesPreset="react" />

      <div className="relative z-10 text-center px-6">
        <img src={assets.IconStrategix} alt="logo" className="mx-auto w-[240px] md:w-[360px]" />
        <p className="mt-6 text-base md:text-lg text-white/70">Frontend — magic. Graphic — power.</p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button as="a" href="#frontend" size="lg">View Works</Button>
          <Button as="a" href="#contact" variant="outline" size="lg">Contact</Button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
    </section>
  )
}