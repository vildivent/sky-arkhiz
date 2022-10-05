/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";

import { MainLayout } from "../../layouts/MainLayout";
import CamPageMenu from "../../components/CamPageMenu";
import { camLinks, staticCamLinks } from "../../constasnts";
import { loadingGif, transparentPlaceholder } from "../../public/assets";
import Image from "next/image";
import CamMenuSwitchButton from "../../components/Buttons/CamMenuSwitchButton";

export default function Webcams() {
  const initialStateLink = staticCamLinks[0];
  const initialStateLinkTV = camLinks[0];
  const [activeLink, setActiveLink] = useState(initialStateLink);
  const [imgSrc, setimgSrc] = useState(activeLink.link);
  const [count, setCount] = useState(0);
  const [liveTV, setLiveTV] = useState(false);
  const [menuIsActive, setMenuIsActive] = useState(false);

  //refresh timer
  useEffect(() => {
    const timer = setInterval(
      () => {
        setCount((value) => value + 1);
        if (!liveTV) setimgSrc(activeLink.link + "?" + count);
        else setimgSrc(activeLink.link + "&" + count);
      },
      liveTV ? 60000 : activeLink.id === initialStateLink.id ? 30000 : 10000
    );
    return () => clearInterval(timer);
  }, [activeLink, count, liveTV, initialStateLink]);

  const changeModeHandler = (mode) => {
    setMenuIsActive((prev) => !prev);
    if (liveTV !== mode)
      clickHandler(
        mode
          ? camLinks.find((link) => {
              return link.id === activeLink.id;
            }) || initialStateLinkTV
          : staticCamLinks.find((link) => {
              return link.id === activeLink.id;
            }) || initialStateLink
      );
  };

  const clickHandler = (camLink) => {
    setMenuIsActive(false);
    setActiveLink(camLink);
    setTimeout(() => setimgSrc(camLink.link), 100);
    setimgSrc(transparentPlaceholder.src);
  };

  //initial load
  useEffect(() => clickHandler(initialStateLink), [initialStateLink]);

  return (
    <MainLayout title={"Web камеры"} mainProps="min-h-[100vh] px-0 sm:p-5">
      {/* switch menu */}
      <div
        className={`font-h3 text-cyan-500 justify-center text-center flex md:my-10 my-5`}
      >
        <CamMenuSwitchButton
          liveTV={liveTV}
          menuIsActive={menuIsActive}
          mode={false}
          onClick={() => {
            setLiveTV(false);
            changeModeHandler(false);
          }}
        >
          Накопление кадров
        </CamMenuSwitchButton>
        <CamMenuSwitchButton
          liveTV={liveTV}
          menuIsActive={menuIsActive}
          mode={true}
          onClick={() => {
            setLiveTV(true);
            changeModeHandler(true);
          }}
        >
          Видео
        </CamMenuSwitchButton>
      </div>

      <div
        className={`flex justify-start items-center md:items-start md:flex-row flex-col`}
      >
        <CamPageMenu
          liveTV={liveTV}
          activeLink={activeLink}
          liveTVhandler={clickHandler}
          menuIsActive={menuIsActive}
        />

        <div
          className={`w-full sm:max-w-[90vh] flex justify-center md:pl-5 pt-2 relative`}
        >
          <div className="absolute w-full h-[60vh] flex justify-center items-center">
            <Image src={loadingGif} alt="loading" />
          </div>
          <img
            src={imgSrc}
            alt={activeLink.title}
            className={`w-full my-auto z-[1]`}
          />
        </div>
      </div>
    </MainLayout>
  );
}
