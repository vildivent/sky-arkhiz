import { useState, useEffect } from "react";
import { MainLayout } from "../../components/MainLayout";
import CamPageMenu from "../../components/CamPageMenu";
import { camLinks } from "../../constasnts";
import { loadingGif } from "../../public/assets";

export default function Webcams() {
  const [activeLink, setActiveLink] = useState(camLinks[0]);
  const [imgSrc, setimgSrc] = useState(activeLink.link);
  const [count, setCount] = useState(0);
  const [liveTV, setLiveTV] = useState(false);

  //refresh timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((value) => value + 1);
      if (activeLink.link === camLinks[0].link)
        setimgSrc(activeLink.link + "?" + count);
      else setimgSrc(activeLink.link + "&" + count);
    }, 60000);
    return () => clearInterval(timer);
  }, [activeLink, count]);

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

        {/* switch menu */}
        <div
          className={`font-h2 text-cyan-500 justify-center text-center flex mb-20`}
        >
          <button
            className={`w-32  ${
              !liveTV ? "text-white bg-[#111111] " : ""
            }} hover:bg-[#181818] hover:text-white`}
            onClick={() => setLiveTV(false)}
          >
            Статичные
          </button>

          <button
            className={`w-32  ${
              liveTV ? "text-white bg-[#111111] " : ""
            }} hover:bg-[#181818] hover:text-white`}
            onClick={() => setLiveTV(true)}
          >
            Live
          </button>
        </div>

        <div className={`flex justify-start md:flex-row flex-col mb-5`}>
          <CamPageMenu
            liveTV={liveTV}
            activeLink={activeLink}
            liveTVhandler={clickHandler}
          />
          <div className={`w-full flex justify-center`}>
            <img
              src={imgSrc}
              alt={activeLink.title}
              className={`${
                liveTV ? "" : "hidden"
              } my-auto lg:max-w-[704px] lg:max-h-[576px] max-w-[350px] max-h-[350px]`}
            />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
