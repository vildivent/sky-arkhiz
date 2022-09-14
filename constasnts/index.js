import {
  iconInstagram,
  iconTelegram,
  iconVk,
  iconWhatsapp,
  iconPhone,
} from "../public/assets";

export const _keywords = "Архыз,Ночные экскурсии,звёзды";
export const _description = "Ночные экскурсии";
export const _title = "sky-arkhiz.ru";

export const navLinks = [
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
    subLinks: [
      {
        id: "all-sky",
        title: "Небо над обсерваторией",
      },
      {
        id: "bta-indom",
        title: "БТА внутри",
      },
      {
        id: "zeiss-1000-to-bta",
        title: "БТА снаружи",
      },
      {
        id: "zeiss-1000-indom",
        title: "Цейсс-1000 внутри",
      },
    ],
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
export const socialLinks = [
  {
    id: "whatsApp",
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
];
export const camLinks = [
  {
    id: "newAllSky",
    title: "Небо над обсерваторией",
    link: "https://www.sao.ru/tb/webcam/mono_allsky.cgi",
  },
  {
    id: "btaFirstCameraIndom",
    title: "БТА внутри",
    link: "https://www.sao.ru/tb/webcam/livecam.cgi?1",
  },
  {
    id: "zeiss1000SecondCameraToBTA",
    title: "БТА снаружи",
    link: "https://www.sao.ru/zserv/webcam/livecam.cgi?1",
  },
  {
    id: "btaSecondCameraOutdoor",
    title: "БТА парковка",
    link: "https://www.sao.ru/tb/webcam/livecam.cgi?2",
  },
  {
    id: "zeiss1000FirstCameraIndom",
    title: "Цейсс-1000 внутри",
    link: "https://www.sao.ru/zserv/webcam/livecam.cgi?0",
  },
  {
    id: "zeiss1000ThirdCameraAllSky",
    title: "Цейсс-1000 небо",
    link: "https://www.sao.ru/zserv/webcam/livecam.cgi?2",
  },
  {
    id: "zeiss10005thCameraOutdoor",
    title: "Цейсс-1000 внешняя",
    link: "https://www.sao.ru/zserv/webcam/livecam.cgi?5",
  },
];
export const staticCamLinks = [
  {
    id: "all-sky",
    title: "Небо над обсерваторией",
    link: "https://www.sao.ru/tb/webcam/mono_allsky.cgi",
  },
  {
    id: "bta-indom",
    title: "БТА внутри",
    link: "https://www.sao.ru/tb/webcam/webcam_sky_1.jpeg",
  },
  {
    id: "zeiss-1000-to-bta",
    title: "БТА снаружи",
    link: "https://www.sao.ru/zserv/webcam/webcam_1_maxi.jpeg",
  },
  {
    id: "zeiss-1000-indom",
    title: "Цейсс-1000 внутри",
    link: "https://www.sao.ru/zserv/webcam/webcam_0_maxi.jpeg",
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
    id: "dashboard/photogallery",
    title: "Фотогалерея",
    mainNavbar: true,
  },
];
