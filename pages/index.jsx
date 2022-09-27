import { HomePageLayout } from "../layouts/HomePageLayout";
import { btaBg1, celestron, btaMobile } from "../public/assets";
import Background from "../components/Background";
import useBackground from "../hooks/useBackground";
import Image from "next/image";
import ActionButton from "../components/Buttons/ActionButton";
import ImageSlider from "../components/ImageSlider";
import Link from "next/link";

export default function Home() {
  const bg = useBackground(btaBg1, btaMobile);

  return (
    <HomePageLayout title={"Главная"}>
      <main>
        <section className="h-[100vh]">
          <Background bg={bg} position="absolute">
            <h1
              className={`text-center sm:text-6xl text-5xl mt-20 font-h1 opacity-80`}
            >
              Экскурсии по ночному небу
            </h1>
          </Background>
        </section>

        <section className={`sm:h-[50vw] w-full sm:pl-20 sm:pt-20 px-2 pt-2`}>
          <div className="h-full w-full flex justify-between items-center sm:flex-row flex-col">
            <div className="sm:w-[40%] sm:pb-20 pb-5 flex flex-col relative z-[1]">
              <h2
                className={`font-h1 sm:text-[3.75vw] text-3xl pb-[1.875vw] sm:text-start text-center`}
              >
                Экскурсии
              </h2>
              <div className="mx-auto sm:text-[1.875vw] sm:text-start text-center">
                <p className="mx-10 sm:mx-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <p className="sm:translate-x-[6vw] mx-10 sm:mx-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <p className="sm:translate-x-[12vw] mx-10 sm:mx-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <p className="sm:translate-x-[18vw] mx-10 sm:mx-0"></p>
              </div>
              <Link href="/excursions/">
                <a>
                  <div className="flex sm:translate-x-[24vw] pt-[1.875vw] sm:justify-start justify-center">
                    <ActionButton
                      title="Подробнее"
                      className="sm:text-[1.875vw] sm:px-[3vw] px-8 sm:py-[1vw] py-2 sm:rounded-[0.7vw] rounded-md"
                    />
                  </div>
                </a>
              </Link>
            </div>
            <div className="relative sm:h-full h-[100vw] sm:w-1/2 w-full">
              <Image
                src={celestron}
                alt="celestron"
                layout="fill"
                objectFit="contain"
                objectPosition={"bottom"}
              />
            </div>
          </div>
        </section>

        <section
          className={`h-full w-full flex flex-col sm:flex-row justify-around bg-[#151515] p-2 sm:p-5`}
        >
          <div className="sm:w-1/2 w-full flex gap-3 flex-col">
            <h2 className="font-h1 sm:text-4xl text-3xl text-center">
              В телескоп можно увидеть:
            </h2>
            <ImageSlider />
          </div>
          <div className="sm:max-w-[25%] flex flex-col justify-center">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              bibendum euismod felis, vel egestas risus porta
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              bibendum euismod felis, vel egestas risus porta
            </p>
          </div>
        </section>
      </main>
    </HomePageLayout>
  );
}
