import type { StaticImageData } from "next/image";
import {
  iconInstagram,
  iconTelegram,
  iconVk,
  iconWhatsapp,
  iconPhone,
  iconNowapp,
} from "../public/assets";

export const _keywords = "Архыз,Ночные экскурсии,звёзды";
export const _description = "Ночные экскурсии";
export const _title = "skyarhyz.ru";

export type NavLink = {
  id: string;
  title: string;
  subTitle?: string;
  mainNavbar?: boolean;
  noLink?: boolean;
  subLinks?: {
    id: string;
    title: string;
  }[];
};

export type NavLinks = {
  id: string;
  title: string;
  subTitle?: string;
  mainNavbar?: boolean;
  noLink?: boolean;
  subLinks?: {
    id: string;
    title: string;
  }[];
}[];

export const navLinks: NavLinks = [
  {
    id: "/",
    title: "Главная",
  },
  {
    id: "excursions",
    title: "Экскурсии",
    mainNavbar: true,
  },
  {
    id: "how-to-get-there",
    title: "Как добраться",
    mainNavbar: true,
  },
  {
    id: "news",
    title: "Новости",
    mainNavbar: true,
  },
  {
    id: "astronomy",
    title: "Астрономия",
    subTitle: "Блог: Статьи по астрономии",
    mainNavbar: true,
    subLinks: [
      {
        id: "what-you-can-see-with-a-telescope",
        title: "Что можно увидеть в телескоп",
      },
      {
        id: "telescopes",
        title: "Телескопы",
      },
    ],
  },
  {
    id: "photogallery",
    title: "Фотогалерея",
    mainNavbar: true,
  },
  {
    id: "reviews",
    title: "Отзывы",
  },
  {
    id: "webcams",
    title: "Web камеры",
    subTitle: "Все камеры",
    mainNavbar: true,
  },
  {
    id: "weather-in-observatory",
    title: "Погода в обсерватории",
  },
  {
    id: "what-else-to-do-in-Arkhyz",
    title: "Чем ещё заняться в Архызе:",
    noLink: true,
    subLinks: [
      {
        id: "planetarium",
        title: "Планетарий",
      },
      {
        id: "tours-to-the-observatory",
        title: "Экскурсии в обсерваторию",
      },
    ],
  },
  {
    id: "collaboration",
    title: "Сотрудничество",
    subTitle: "Сотрудничество с нами",
    subLinks: [
      {
        id: "transfer",
        title: "Трансфер",
      },
      {
        id: "accommodation",
        title: "Жилье",
      },
    ],
  },
  {
    id: "about",
    title: "Обо мне",
  },
  {
    id: "contacts",
    title: "Контакты",
  },
];
export const callLink = {
  id: "call",
  title: "Звонок",
  link: "tel:+79283843040",
  logo: iconPhone,
};

export type socialLinks = {
  id: "whatsapp" | "telegram" | "vk" | "instagram" | "nowapp" | string;
  title: string;
  link: string;
  logo: StaticImageData | string;
}[];

export const socialLinks: socialLinks = [
  {
    id: "whatsapp",
    title: "Ватсап",
    link: "https://wa.me/79283843040",
    logo: iconWhatsapp,
  },
  {
    id: "telegram",
    title: "Телеграм",
    link: "https://telegram.me/dimglen",
    logo: iconTelegram,
  },
  {
    id: "vk",
    title: "Вконтакте",
    link: "https://vk.me/id23187362",
    logo: iconVk,
  },
  {
    id: "instagram",
    title: "Инстаграм",
    link: "https://www.instagram.com/dimglen/",
    logo: iconInstagram,
  },
  {
    id: "nowapp",
    title: "Nowapp",
    link: "https://nowapp.me/dimglen",
    logo: iconNowapp,
  },
];
export const camLinks = [
  {
    id: "btaFirstCameraIndom",
    title: "БТА внутри",
    link: "https://www.sao.ru/tb/webcam/livecam.cgi?1",
    updateTimer: 60000,
  },
  {
    id: "zeiss1000SecondCameraToBTA",
    title: "БТА снаружи",
    link: "https://www.sao.ru/zserv/webcam/livecam.cgi?1",
    updateTimer: 60000,
  },
  {
    id: "btaSecondCameraOutdoor",
    title: "БТА парковка",
    link: "https://www.sao.ru/tb/webcam/livecam.cgi?2",
    updateTimer: 60000,
  },
  {
    id: "zeiss1000FirstCameraIndom",
    title: "Цейсс-1000 внутри",
    link: "https://www.sao.ru/zserv/webcam/livecam.cgi?0",
    updateTimer: 60000,
  },
  {
    id: "zeiss1000ThirdCameraAllSky",
    title: "Цейсс-1000 небо",
    link: "https://www.sao.ru/zserv/webcam/livecam.cgi?2",
    updateTimer: 60000,
  },
  {
    id: "zeiss10005thCameraOutdoor",
    title: "Цейсс-1000 внешняя",
    link: "https://www.sao.ru/zserv/webcam/livecam.cgi?5",
    updateTimer: 60000,
  },
];
export const staticCamLinks = [
  {
    id: "all-sky",
    title: "Небо над обсерваторией",
    link: "https://www.sao.ru/tb/webcam/mono_allsky.cgi",
    updateTimer: 30000,
  },
  {
    id: "btaFirstCameraIndom",
    title: "БТА внутри",
    link: "https://www.sao.ru/tb/webcam/webcam_sky_1.jpeg",
    updateTimer: 10000,
  },
  {
    id: "zeiss1000SecondCameraToBTA",
    title: "БТА снаружи",
    link: "https://www.sao.ru/zserv/webcam/webcam_1_maxi.jpeg",
    updateTimer: 10000,
  },
  {
    id: "btaSecondCameraOutdoor",
    title: "БТА парковка",
    link: "https://www.sao.ru/tb/webcam/webcam_sky_2_maxi.jpeg",
    updateTimer: 10000,
  },
  {
    id: "zeiss1000FirstCameraIndom",
    title: "Цейсс-1000 внутри",
    link: "https://www.sao.ru/zserv/webcam/webcam_0_maxi.jpeg",
    updateTimer: 30000,
  },
  {
    id: "zeiss1000ThirdCameraAllSky",
    title: "Цейсс-1000 небо",
    link: "https://www.sao.ru/zserv/webcam/webcam_2_maxi.jpeg",
    updateTimer: 60000,
  },
  {
    id: "zeiss10005thCameraOutdoor",
    title: "Цейсс-1000 внешняя",
    link: "https://www.sao.ru/zserv/webcam/webcam_5_maxi.jpeg",
    updateTimer: 10000,
  },
];

export const dashboardLinks = [
  {
    id: "/",
    title: "Главная",
  },
  {
    id: "dashboard",
    title: "Панель управления",
    mainNavbar: true,
  },
  {
    id: "dashboard/news",
    title: "Новости",
    mainNavbar: true,
  },
  {
    id: "dashboard/reviews",
    title: "Отзывы",
    mainNavbar: true,
  },
  {
    id: "dashboard/requests",
    title: "Заявки",
    mainNavbar: true,
  },
  {
    id: "dashboard/photogallery",
    title: "Фотогалерея",
    mainNavbar: true,
  },
];

export const requestStatusTypes = [
  {
    id: "new",
    title: "Новая",
    titlePlural: "Новые",
  },
  {
    id: "registered",
    title: "Зарегистрированная",
    titlePlural: "Зарегистрированные",
  },
  {
    id: "active",
    title: "Активная",
    titlePlural: "Активные",
  },
  {
    id: "fulfilled",
    title: "Завершённая",
    titlePlural: "Завершённые",
  },
  {
    id: "outdated",
    title: "Просроченная",
    titlePlural: "Просроченные",
  },
];

export const reviewStatusTypes = [
  {
    id: "new",
    title: "Новый",
    titlePlural: "Новые",
  },
  {
    id: "checked",
    title: "Проверенный",
    titlePlural: "Проверенные",
  },
];

export const categories = [
  "",
  "Объекты, наблюдаемые на экскурсии",
  "Фото с экскурсий",
  "Мои астрофотографии",
];
