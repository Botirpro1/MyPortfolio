import FallingCodeBackground from './FallingCodeBackground'

export default function Intro() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* фон */}
      <FallingCodeBackground density={0.8} speed={1} phrasesPreset="react" />

      {/* контент поверх */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold">I am Botir</h1>
        <p className="mt-4 text-lg text-white/70">Frontend Developer & Graphic Designer</p>
      </div>
    </section>
  )
}