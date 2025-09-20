// import { useEffect, useMemo, useRef, useState } from "react";

// /**
//  * Простой прямоугольный кастом-скроллбар.
//  * – Визуальные стили лежат в scroll.css: .simple-scrollbar, .simple-scrollbar-thumb
//  * – По умолчанию отслеживает прокрутку всей страницы (window/document)
//  * – Можно передать target: CSS-селектор или HTMLElement для внутреннего контейнера со скроллом
//  */
// export default function Scrollbar({
//   top = 0,
//   right = 0,
//   bottom = 0,
//   width = 6,
//   minThumb = 0,
//   color = "#9aa0a6",
//   target = null, // string | HTMLElement | null
//   trackClass = "simple-scrollbar",
//   thumbClass = "simple-scrollbar-thumb",
// }) {
//   const trackRef = useRef(null);
//   const [thumb, setThumb] = useState({ h: 0, y: 0 });

//   // Определяем реальный скроллящийся контейнер
//   const scrollEl = useMemo(() => {
//     if (!target) return null; // null = документ
//     if (typeof target === "string") return document.querySelector(target);
//     return target instanceof HTMLElement ? target : null;
//   }, [target]);

//   useEffect(() => {
//     const el = scrollEl; // null = документ

//     const getMetrics = () => {
//       if (el) {
//         const scrollTop = el.scrollTop;
//         const scrollHeight = el.scrollHeight;
//         const clientHeight = el.clientHeight;
//         return { scrollTop, scrollHeight, clientHeight };
//       }
//       // документ
//       const doc = document.documentElement;
//       const body = document.body;
//       const scrollTop = doc.scrollTop || body.scrollTop;
//       const scrollHeight = Math.max(
//         body.scrollHeight, doc.scrollHeight,
//         body.offsetHeight, doc.offsetHeight,
//         body.clientHeight, doc.clientHeight
//       );
//       const clientHeight = window.innerHeight;
//       return { scrollTop, scrollHeight, clientHeight };
//     };

//     const update = () => {
//       const { scrollTop, scrollHeight, clientHeight } = getMetrics();
//       const trackRect = trackRef.current?.getBoundingClientRect();
//       const trackH = trackRect ? trackRect.height : Math.max(0, (window.innerHeight || 0) - top - bottom);

//       // высота ползунка пропорциональна видимой части; минимум – minThumb
//       const h = Math.max(minThumb, (clientHeight / scrollHeight) * trackH);
//       const maxY = Math.max(0, trackH - h);
//       const denom = Math.max(1, scrollHeight - clientHeight);
//       const ratio = Math.min(1, Math.max(0, scrollTop / denom));
//       const y = ratio * maxY;
//       setThumb({ h, y });
//     };

//     update();
//     const opts = { passive: true };
//     (el || window).addEventListener("scroll", update, opts);
//     window.addEventListener("resize", update);
//     return () => {
//       (el || window).removeEventListener("scroll", update, opts);
//       window.removeEventListener("resize", update);
//     };
//   }, [scrollEl, top, bottom, minThumb]);

//   return (
//     <div
//       ref={trackRef}
//       className={trackClass}
//       aria-hidden
//       style={{ position: "fixed", top, right, bottom, width }}
//     >
//       <div
//         className={thumbClass}
//         style={{
//           height: `${thumb.h}px`,
//           transform: `translateY(${thumb.y}px)`,
//           background: color,
//         }}
//       />
//     </div>
//   );
// }