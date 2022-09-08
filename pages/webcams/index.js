import { useState, useEffect } from "react";

import { MainLayout } from "../../layouts/MainLayout";
import CamPageMenu from "../../components/CamPageMenu";
import { camLinks } from "../../constasnts";
import { loadingGif } from "../../public/assets";
import SwitchButton from "../../components/switchButton";

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
    }, 30000);
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
      {/* switch menu */}
      <div
        className={`font-h3 text-cyan-500 justify-center text-center flex md:my-10 my-5`}
      >
        <SwitchButton
          title={"Статичные"}
          state={liveTV}
          setState={setLiveTV}
          isLiveButton={false}
        />
        <SwitchButton
          title={"Live"}
          state={liveTV}
          setState={setLiveTV}
          isLiveButton={true}
        />
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
    </MainLayout>
  );
}
