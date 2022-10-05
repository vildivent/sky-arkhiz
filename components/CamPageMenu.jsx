import { camLinks, staticCamLinks } from "../constasnts";

const CamPageMenu = ({ liveTV, activeLink, liveTVhandler, menuIsActive }) => {
  const links = liveTV ? camLinks : staticCamLinks;
  return (
    <div className={`flex justify-center`}>
      <ul
        className={`text-start md:pl-20 ${
          menuIsActive
            ? ""
            : "h-0 opacity-0 pointer-events-none sm:h-full sm:opacity-100 sm:pointer-events-auto"
        }`}
      >
        {links.map((camLink) => (
          <li
            key={camLink.id}
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
