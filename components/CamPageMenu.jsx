import { camLinks, staticCamLinks } from "../constants";

const CamPageMenu = ({ liveTV, activeLink, liveTVhandler, menuIsActive }) => {
  const links = liveTV ? camLinks : staticCamLinks;
  return (
    <div
      className={`${
        menuIsActive
          ? `${liveTV ? "h-[240px]" : "h-[280px]"}`
          : "h-0 opacity-0 pointer-events-none md:h-full md:opacity-100 md:pointer-events-auto"
      } flex justify-center transition-all duration-300`}
    >
      <ul className={`text-start md:pl-20 `}>
        {links.map((camLink) => (
          <li
            key={`${camLink.id}`}
            className={`${
              camLink.id === activeLink.id
                ? "text-white bg-[#111111] bg-opacity-70"
                : "text-cyan-500"
            } p-2 cursor-pointer whitespace-nowrap hover:text-white hover:bg-[#181818] hover:bg-opacity-80`}
            onClick={() => liveTVhandler(camLink)}
          >
            {camLink.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CamPageMenu;
