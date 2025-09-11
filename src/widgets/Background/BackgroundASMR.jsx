import { useEffect, useRef } from "react";

export default function BackgroundASMR() {
  const ctxRef = useRef(null);
  const gainRef = useRef(null);
  const oscRef = useRef(null);
  const lpRef = useRef(null);
  const timerRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const NOTES = [220, 246.94]; // A3 и B♭3 — спокойные близкие тона
    let noteIdx = 0;

    const startAudio = async () => {
      if (startedRef.current) return;
      startedRef.current = true;

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx({ latencyHint: "playback" });
      ctxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.value = 0.0; // старт с 0 — плавный fade-in
      gainRef.current = master;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.value = 1200; // прячем верх
      lpRef.current = lowpass;

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = NOTES[noteIdx];
      oscRef.current = osc;

      // цепочка: osc -> lowpass -> gain -> destination
      osc.connect(lowpass);
      lowpass.connect(master);
      master.connect(ctx.destination);
      osc.start();

      // плавный fade-in к очень тихому уровню
      const targetVol = 0.06;
      const now = ctx.currentTime;
      master.gain.setValueAtTime(0, now);
      master.gain.linearRampToValueAtTime(targetVol, now + 4);

      // медленное чередование нот с плавным глайдом
      timerRef.current = setInterval(() => {
        noteIdx = (noteIdx + 1) % NOTES.length;
        const t = ctx.currentTime;
        osc.frequency.cancelScheduledValues(t);
        osc.frequency.setTargetAtTime(NOTES[noteIdx], t, 2.0); // мягкий переход ~2с
      }, 8000); // каждые ~8 секунд
    };

    // попытка автозапуска
    startAudio().catch(() => {});
    // если заблокировано — включаем при первом взаимодействии
    const unlock = () => startAudio();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      if (timerRef.current) clearInterval(timerRef.current);
      try { oscRef.current?.stop(); } catch {}
      ctxRef.current?.close();
    };
  }, []);

  return null; // без UI
}