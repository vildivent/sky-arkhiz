import { camLinks, staticCamLinks } from "../constasnts";

const CamPageMenu = ({ liveTV, activeLink, liveTVhandler }) => {
  const links = liveTV ? camLinks : staticCamLinks;
  return (
    <div className={`flex justify-center`}>
      <ul className={`flex flex-col justify-start text-start md:pl-20`}>
        {links.map((camLink) => (
          <li
            key={camLink.id}
            className={`${
              camLink.id === activeLink.id
                ? "text-white bg-[#111111]"
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
