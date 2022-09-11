import Link from "next/link";
import { camLinks, staticCamLinks } from "../constasnts";

const CamPageMenu = ({ liveTV, activeLink, liveTVhandler }) => {
  if (liveTV)
    return (
      <div className={`flex justify-center`}>
        <ul className={`flex flex-col justify-start text-start md:pl-20`}>
          {camLinks.map((camLink) => (
            <li
              key={camLink.id}
              className={`${
                camLink.id === activeLink.id ? "text-white" : "text-cyan-500"
              } py-2 cursor-pointer whitespace-nowrap hover:text-white hover:bg-[#181818] hover:bg-opacity-80`}
              onClick={() => liveTVhandler(camLink)}
            >
              {camLink.title}
            </li>
          ))}
        </ul>
      </div>
    );
  else
    return (
      <div className={`flex justify-center`}>
        <ul className={`flex flex-col justify-start text-start md:pl-20`}>
          {staticCamLinks.map((camLink) => (
            <Link href={`/webcams/${camLink.id}`} key={camLink.id}>
              <a>
                <li
                  className={`${
                    camLink.id === activeLink.id
                      ? "text-white"
                      : "text-cyan-500"
                  } py-2 cursor-pointer whitespace-nowrap hover:text-white hover:bg-[#181818] hover:bg-opacity-80`}
                >
                  {camLink.title}
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </div>
    );
};

export default CamPageMenu;
