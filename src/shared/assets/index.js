// сюда импортируем все картинки/иконки проекта
// пример: положи логотип и аватар в указанные папки, или замени пути на свои

import logoPng from "./images/me.png";
import meJpg from "./images/me.png";
import githubSvg from "./icons/github.svg";
import telegramSvg from "./icons/telegram.svg";

// экспорт как объект — удобно импортировать одной строкой
export const assets = {
  logo: logoPng,
  me: meJpg,
  github: githubSvg,
  telegram: telegramSvg
};

// также можно именованными экспортами, если вдруг нужно:
// export { logoPng as iconLogo, meJpg as photoMe };
