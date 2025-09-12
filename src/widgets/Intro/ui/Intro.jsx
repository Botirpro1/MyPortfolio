import FallingCodeBackground from './FallingCodeBackground'
import assets from '@/shared/assets'
export default function Intro() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <FallingCodeBackground density={0.8} speed={1} phrasesPreset="react" />
      <div className="relative z-10 text-center">
        <img src={assets.IconStrategix} style={{width: "1200px"}} alt="Me" />
        <p className="mt-4 text-lg text-white/70" >Frontend — magic. Graphic — power.</p>
      </div>
    </section>
  )
}