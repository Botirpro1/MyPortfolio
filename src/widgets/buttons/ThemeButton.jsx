import { useTheme } from "@/app/providers/theme";
import styled from "styled-components";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const handleToggle = (e) => {
    // Координаты волны: при клике/таче берём clientX/Y; иначе — центр label
    let x = e?.nativeEvent?.clientX;
    let y = e?.nativeEvent?.clientY;
    if (typeof x !== 'number' || typeof y !== 'number') {
      const label = e?.currentTarget?.closest('label') || document.querySelector('label[for="themeToggle"]');
      const rect = label ? label.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
      x = rect.left + rect.width / 2;
      y = rect.top  + rect.height / 2;
    }

    // 0) Отключаем все CSS-переходы на время эффекта, чтобы не было общего fade
    const html = document.documentElement;
    html.classList.add('theme-switching');

    // 1) Переключаем тему — var(--*) уже из НОВОЙ темы
    setTheme(isDark ? "light" : "dark");

    // 2) Создаём оверлей волны с размытыми краями
    const wave = document.createElement('div');
    wave.className = 'theme-wave';
    wave.style.setProperty('--x', `${x}px`);
    wave.style.setProperty('--y', `${y}px`);
    document.body.appendChild(wave);

    // 3) По окончании анимации — убираем оверлей и возвращаем переходы
    wave.addEventListener('animationend', () => {
      wave.remove();
      html.classList.remove('theme-switching');
    }, { once: true });
  };

  return (
    <StyledWrapper>
      <label
        htmlFor="themeToggle"
        className="themeToggle st-sunMoonThemeToggleBtn"
      >
        <input
          type="checkbox"
          id="themeToggle"
          className="themeToggleInput"
          checked={isDark}
          onChange={(e) => handleToggle(e)}
          aria-label="Toggle color theme"
        />
        <svg width={18} height={18} viewBox="0 0 20 20" fill="currentColor" stroke="none">
          <mask id="moon-mask">
            <rect x={0} y={0} width={20} height={20} fill="white" />
            <circle cx={11} cy={3} r={8} fill="black" />
          </mask>
          <circle className="sunMoon" cx={10} cy={10} r={8} mask="url(#moon-mask)" />
          <g>
            <circle className="sunRay sunRay1" cx={18} cy={10} r="1.5" />
            <circle className="sunRay sunRay2" cx={14} cy="16.928" r="1.5" />
            <circle className="sunRay sunRay3" cx={6} cy="16.928" r="1.5" />
            <circle className="sunRay sunRay4" cx={2} cy={10} r="1.5" />
            <circle className="sunRay sunRay5" cx={6} cy="3.1718" r="1.5" />
            <circle className="sunRay sunRay6" cx={14} cy="3.1718" r="1.5" />
          </g>
        </svg>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* a clone from joshwcomeau.com 
   * but this version runs on pure CSS
   */

  .themeToggle {
    color: #bbb;
  }

  .st-sunMoonThemeToggleBtn {
    position: relative;
    cursor: pointer;
    display: inline-block;
    width: 44px;
    height: 44px;
    vertical-align: middle;
  }

  .st-sunMoonThemeToggleBtn .themeToggleInput {
    position: relative;
    opacity: 0;
    width: 100%;
    height: 100%;
  }

  .st-sunMoonThemeToggleBtn svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.4s ease;
    transform: rotate(40deg);
    pointer-events: none;
  }

  .st-sunMoonThemeToggleBtn svg .sunMoon {
    transform-origin: center center;
    transition: inherit;
    transform: scale(1);
  }

  .st-sunMoonThemeToggleBtn svg .sunRay {
    transform-origin: center center;
    transform: scale(0);
  }

  .st-sunMoonThemeToggleBtn svg mask > circle {
    transition: transform 0.64s cubic-bezier(0.41, 0.64, 0.32, 1.575);
    transform: translate(0px, 0px);
  }

  .st-sunMoonThemeToggleBtn svg .sunRay2 {
    animation-delay: 0.05s !important;
  }
  .st-sunMoonThemeToggleBtn svg .sunRay3 {
    animation-delay: 0.1s !important;
  }
  .st-sunMoonThemeToggleBtn svg .sunRay4 {
    animation-delay: 0.17s !important;
  }
  .st-sunMoonThemeToggleBtn svg .sunRay5 {
    animation-delay: 0.25s !important;
  }
  .st-sunMoonThemeToggleBtn svg .sunRay6 {
    animation-delay: 0.29s !important;
  }

  .st-sunMoonThemeToggleBtn .themeToggleInput:checked + svg {
    transform: rotate(90deg);
  }
  .st-sunMoonThemeToggleBtn .themeToggleInput:checked + svg mask > circle {
    transform: translate(16px, -3px);
  }
  .st-sunMoonThemeToggleBtn .themeToggleInput:checked + svg .sunMoon {
    transform: scale(0.55);
  }
  .st-sunMoonThemeToggleBtn .themeToggleInput:checked + svg .sunRay {
    animation: showRay1832 0.4s ease 0s 1 forwards;
  }

  @keyframes showRay1832 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
`;
