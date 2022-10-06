import { motion } from "framer-motion";
import { HomePageLayout } from "../layouts/HomePageLayout";
import {
  celestron,
  cardImage1,
  cameraPreview,
  planetariumSmall,
  btaSmall,
} from "../public/assets";
import Image from "next/image";
import ActionButton from "../components/Buttons/ActionButton";
import ImageSlider from "../components/ImageSlider";
import Link from "next/link";
import AstronomyCard from "../components/AstronomyCard";
import ElseToDoCard from "../components/ElseToDoCard";
import Hero from "../components/HomePage/Sections/Hero";
import AboutExcursions from "../components/HomePage/Sections/AboutExcursions";
import Webcams from "../components/HomePage/Sections/Webcams";

export default function Home() {
  const buttonStyle = "text-lg sm:px-10 px-8 py-2 sm:rounded-lg rounded-md";

  return (
    <HomePageLayout title={"Главная"}>
      <main>
        <Hero />
        <AboutExcursions />
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

        <Webcams />

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
