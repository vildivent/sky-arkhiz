import { HomePageLayout } from "../layouts/HomePageLayout";
import { btaBg1, celestron, btaMobile } from "../public/assets";
import CTACard from "../components/CTACard";
import { roadToStarsGalaxyCut } from "../public/assets";
import Background from "../components/Background";
import useBackground from "../hooks/useBackground";
import Image from "next/image";
import ActionButton from "../components/Buttons/ActionButton";

export default function Home() {
  const bg = useBackground(btaBg1, btaMobile);
  return (
    <HomePageLayout title={"Главная"}>
      <main>
        <div className="h-[100vh]">
          <Background bg={bg} position="absolute">
            <h1
              className={`text-center sm:text-[62px] text-5xl mt-20 font-h1 opacity-80 `}
            >
              Экскурсии по ночному небу
            </h1>
          </Background>
        </div>

        <div
          className={`h-[60vh] w-full relative flex flex-col sm:flex-row pt-20`}
        >
          <div className="w-1/2 pl-10 flex flex-col relative z-[1]">
            <h2 className={`font-h1 text-4xl text-center`}>Экскурсии</h2>
            <div className="">
              <p className="text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <p className="text-xl translate-x-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <p className=" text-xl translate-x-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <p className=" text-xl translate-x-20">
                <ActionButton title="Подробнее" className=" mx-auto" />
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-end relative h-full sm:w-1/2 w-full"></div>
        </div>
      </main>
    </HomePageLayout>
  );
}
