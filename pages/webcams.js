import { useState, useEffect } from "react";
import { MainLayout } from "../components/MainLayout";
import { camLinks } from "../constasnts";

export default function Webcams() {
  const [activeLink, setActiveLink] = useState(camLinks[0]);
  const [counter, setCounter] = useState(0);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setCounter(counter + 1), 6000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <MainLayout title={"Web камеры"}>
      <main>
        <h1
          className={`text-center font-h1 sm:text-[72px] text-[45px] mt-24 pt-8`}
        >
          Web камеры
        </h1>
        <p className={`font-p text-[15px] leading-normal text-center`}>
          Для обновления камеры переключите на другую и обратно
        </p>
        <div className={`flex justify-center flex-wrap`}>
          <ul className={`flex flex-col justify-start text-start p-5`}>
            {camLinks.map((camLink) => (
              <li
                key={camLink.id}
                className={`${
                  camLink.id === activeLink.id ? "text-white" : "text-cyan-500"
                }  pb-5 cursor-pointer hover:bg-[#181818]`}
                onClick={() => setActiveLink(camLink)}
              >
                {camLink.title}
              </li>
            ))}
          </ul>
          <img
            src={activeLink.link}
            alt={activeLink.title}
            className={`p-5`}
            width={704}
            height={576}
          />
        </div>
      </main>
    </MainLayout>
  );
}
