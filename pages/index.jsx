import { HomePageLayout } from "../layouts/HomePageLayout";
import Hero from "../components/Hero";
import { mainBg, btaBg1, planetarium, bta2 } from "../public/assets";
import CTACard from "../components/CTACard";
import { roadToStarsGalaxyCut, roadToStarsTelescope } from "../public/assets";
import useBackground from "../hooks/useBackground";
import BgCover from "../components/BgCover";

export default function Home() {
  return (
    <HomePageLayout title={"Главная"}>
      <main>
        <Hero bg={btaBg1} height="100vh">
          <h1
            className={`text-center sm:text-[62px] text-[42px] mt-20 font-h1 `}
          >
            Экскурсии по ночному небу
          </h1>
        </Hero>

        <div className={`flex justify-around flex-wrap`}>
          <CTACard
            heading={"Дорога к звёздам"}
            description={"Ночная экскурсия по звёздному небу с телескопом"}
            img={roadToStarsGalaxyCut}
            alt={"Галактика"}
            link={"/excursions"}
            opacity={80}
          />
          <CTACard
            heading={"Планетарий САО РАН"}
            description={""}
            img={planetarium}
            alt={"Планетарий"}
            link={"/what-else-to-do-in-Arkhyz/planetarium"}
            opacity={50}
          />
          <CTACard
            heading={"Экскурсии в обсерваторию"}
            description={"Телескопы: оптический БТА и радиотелескоп РАТАН-600"}
            img={bta2}
            alt={"БТА холл"}
            link={"/what-else-to-do-in-Arkhyz/tours-to-the-observatory"}
            opacity={50}
          />
        </div>
      </main>
    </HomePageLayout>
  );
}
