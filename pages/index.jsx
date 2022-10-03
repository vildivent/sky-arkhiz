import { HomePageLayout } from "../layouts/HomePageLayout";
import {
  btaBg1,
  celestron,
  btaMobile,
  cardImage1,
  cameraPreview,
  planetariumSmall,
  btaSmall,
} from "../public/assets";
import Background from "../components/Background";
import useBackground from "../hooks/useBackground";
import Image from "next/image";
import ActionButton from "../components/Buttons/ActionButton";
import ImageSlider from "../components/ImageSlider";
import Link from "next/link";
import AstronomyCard from "../components/AstronomyCard";
import ElseToDoCard from "../components/ElseToDoCard";

export default function Home() {
  const bg = useBackground(btaBg1, btaMobile);
  const buttonStyle = "text-lg sm:px-10 px-8 py-2 sm:rounded-lg rounded-md";

  return (
    <HomePageLayout title={"Главная"}>
      <main>
        <section className="h-[100vh] relative">
          <Background bg={bg} position="absolute">
            <h1
              className={`text-center sm:text-6xl text-5xl sm:mt-20 mt-10 font-h1 opacity-80 cursor-default`}
            >
              Экскурсии по ночному небу
            </h1>
          </Background>
          <div className="absolute flex justify-center gap-3 items-center flex-col bottom-10 sm:bottom-10 w-full">
            <h2
              className={`text-center sm:text-5xl text-4xl font-h2 opacity-80 cursor-default`}
            >
              Записаться:
            </h2>
            <Link href="/request">
              <a>
                <ActionButton className={`${buttonStyle} opacity-95`}>
                  Оставить заявку
                </ActionButton>
              </a>
            </Link>
          </div>
        </section>

        <section className={`sm:h-[80vh] w-full sm:pl-10 lg:pl-20 pt-2 px-2 `}>
          <div className="h-full w-full flex justify-between items-center sm:flex-row flex-col">
            <div className="sm:w-[40%] xl:pb-20 pb-3 flex flex-col justify-center relative z-[1]">
              <h2
                className={`font-h1 text-3xl sm:text-4xl xl:text-5xl my-5 sm:text-start text-center`}
              >
                Экскурсии
              </h2>
              <div className="mx-auto sm:text-start text-center 2xl:text-xl">
                <p className="mx-10 sm:mx-0 2xl:my-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem
                  ipsum dolor sit amet
                </p>
                <p className="sm:translate-x-[6vw] mx-10 sm:mx-0 2xl:my-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem
                  ipsum dolor sit amet
                </p>
                <p className="sm:translate-x-[12vw] mx-10 sm:mx-0 2xl:my-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem
                  ipsum dolor sit amet
                </p>
              </div>
              <Link href="/excursions/">
                <a>
                  <div className="flex sm:translate-x-[24vw] pt-5 sm:justify-start justify-center">
                    <ActionButton className={buttonStyle}>
                      Подробнее
                    </ActionButton>
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
            <h2 className="font-h1 text-3xl sm:text-4xl xl:text-5xl text-center my-5">
              Вы увидете:
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

        <section className="p-5">
          <h2 className="font-h1 text-3xl sm:text-4xl xl:text-5xl text-center my-5 sm:mb-10">
            Блог: Статьи по астрономии
          </h2>
          <div className="flex flex-wrap gap-5 sm:gap-10 justify-center">
            <AstronomyCard
              href="/astronomy/telescopes/"
              imageSrc={cardImage1}
              title="Телескопы"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum euismod felis, vel egestas risus porta bibendum euismod felis, vel egestas risus"
            />
            <AstronomyCard
              href="/astronomy/what-you-can-see-with-a-telescope/"
              imageSrc={cardImage1}
              title="Что можно увидеть в телескоп"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum euismod felis, vel egestas risus porta bibendum euismod felis, vel egestas risus"
            />
          </div>
        </section>

        <section className="p-5 flex sm:flex-row flex-col bg-[#151515] gap-5 sm:justify-around">
          <div className="sm:selection:w-1/2 shadow-lg shadow-black rounded-full hover:scale-[1.02] sm:my-10">
            <Link href="/webcams/all-sky/">
              <a>
                <Image
                  src={cameraPreview}
                  alt="Небо над обсерваторией"
                  placeholder="blur"
                />
              </a>
            </Link>
          </div>
          <div className="flex flex-col justify-center sm:w-1/2 text-center gap-5 sm:max-w-[25%]">
            <h2 className="font-h1 text-3xl sm:text-4xl xl:text-5xl">Камеры</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              bibendum euismod felis, vel egestas risus porta bibendum euismod
              felis, vel egestas risus porta
            </p>
            <Link href="/webcams/">
              <a>
                <div className="flex justify-center">
                  <ActionButton className={buttonStyle}>Подробнее</ActionButton>
                </div>
              </a>
            </Link>
          </div>
        </section>

        <section className="p-5 flex flex-col gap-10">
          <h2 className="font-h1 text-3xl sm:text-4xl xl:text-5xl text-center">
            Чем ещё заняться в Архызе
          </h2>

          <ElseToDoCard
            title="Можете посетить наш планетарий"
            href="/what-else-to-do-in-Arkhyz/planetarium/"
            imgSrc={planetariumSmall}
          />
          <ElseToDoCard
            title="Или посетите экскурсию в обсерватории"
            href="/what-else-to-do-in-Arkhyz/tours-to-the-observatory/"
            imgSrc={btaSmall}
          />
        </section>

        <section className="p-5 flex flex-col gap-10 bg-[#151515]">
          <h2 className="font-h1 text-3xl sm:text-4xl xl:text-5xl text-center">
            Уже посетили экскурсию? Оставьте отзыв
          </h2>
          <Link href={"/reviews/create"}>
            <a>
              <div className="flex justify-center">
                <ActionButton className={buttonStyle}>
                  Оставить отзыв
                </ActionButton>
              </div>
            </a>
          </Link>
        </section>
      </main>
    </HomePageLayout>
  );
}
