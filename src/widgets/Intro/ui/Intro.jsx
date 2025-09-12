import FallingCodeBackground from './FallingCodeBackground'

export default function Intro() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <FallingCodeBackground density={0.8} speed={1} phrasesPreset="react" />
      <div className="relative z-10 text-center">
        <img src="${Icon}" alt="logo" srcset="" />
        <p className="mt-4 text-lg text-white/70">Frontend Developer & Graphic Designer</p>
      </div>
    </section>
  )
}