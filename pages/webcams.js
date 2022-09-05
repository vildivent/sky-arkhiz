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
    setTimeout(() => setimgSrc(camLink.link), 500);
  };

  //initial load
  useEffect(() => clickHandler(camLinks[0]), []);

  return (
    <MainLayout title={"Web камеры"}>
      <main>
        <h1
          className={`text-center font-h1 sm:text-[72px] text-[45px] mt-24 pt-8 pb-5`}
        >
          Web камеры
        </h1>
        <div className={`flex justify-start md:flex-row flex-col mb-5`}>
          <div className={`flex justify-center`}>
            <ul className={`flex flex-col justify-start text-start md:pl-20`}>
              {camLinks.map((camLink) => (
                <li
                  key={camLink.id}
                  className={`${
                    camLink.id === activeLink.id
                      ? "text-white"
                      : "text-cyan-500"
                  }  pb-5 cursor-pointer whitespace-nowrap hover:bg-[#181818]`}
                  onClick={() => clickHandler(camLink)}
                >
                  {camLink.title}
                </li>
              ))}
            </ul>
          </div>

          <div className={`w-full flex justify-center`}>
            <img
              src={imgSrc}
              alt={activeLink.title}
              className={`my-auto lg:max-w-[704px] lg:max-h-[576px] max-w-[350px] max-h-[350px]`}
            />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
