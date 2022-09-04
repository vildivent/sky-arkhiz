import { useState, useEffect } from "react";
import { MainLayout } from "../components/MainLayout";
import { camLinks } from "../constasnts";
import { loadingGif } from "../public/assets";

export default function Webcams() {
  const [activeLink, setActiveLink] = useState(camLinks[0]);
  const [imgSrc, setimgSrc] = useState(activeLink.link);

  //refresh timer
  useEffect(() => {
    const timer = setInterval(() => clickHandler(activeLink), 60000);
    return () => clearInterval(timer);
  }, [activeLink]);

  const clickHandler = (camLink) => {
    setActiveLink(camLink);
    setimgSrc(loadingGif.src);
    setTimeout(() => setimgSrc(camLink.link), 100);
  };

  return (
    <MainLayout title={"Web камеры"}>
      <main>
        <h1
          className={`text-center font-h1 sm:text-[72px] text-[45px] mt-24 pt-8 pb-5`}
        >
          Web камеры
        </h1>
        <div className={`flex justify-start md:flex-row flex-col flex-wrap`}>
          <div className={`flex justify-center`}>
            <ul
              className={`flex flex-col justify-start text-start md:pl-20 xl:pl-40 2xl:pl-60`}
            >
              {camLinks.map((camLink) => (
                <li
                  key={camLink.id}
                  className={`${
                    camLink.id === activeLink.id
                      ? "text-white"
                      : "text-cyan-500"
                  }  pb-5 cursor-pointer hover:bg-[#181818]`}
                  onClick={() => clickHandler(camLink)}
                >
                  {camLink.title}
                </li>
              ))}
            </ul>
          </div>

          <div className={`flex justify-center border-cyan-500 m-5 p-1`}>
            <img
              src={imgSrc}
              alt={activeLink.title}
              className={`my-auto lg:max-w-[704px] lg:max-h-[576px] max-w-[370px] max-h-[370px]`}
            />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
