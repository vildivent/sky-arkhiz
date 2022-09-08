import { HomePageLayout } from "../layouts/HomePageLayout";
import Hero from "../components/Hero";
import { mainBg, btaBg1 } from "../public/assets";
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
            heading={"Что можно увидеть в телескоп"}
            description={""}
            img={roadToStarsTelescope}
            alt={"Телескоп"}
            link={"/astronomy/what-you-can-see-with-a-telescope"}
            opacity={30}
          />
          <CTACard
            heading={"Телескопы"}
            description={""}
            img={roadToStarsTelescope}
            alt={"Телескоп"}
            link={"/astronomy/telescopes"}
            opacity={30}
          />
        </div>

        <div className="font-p text-[21px] text-justify mb-10 lg:w-[40%] sm:w-[70%] w-[90%] mt-5 mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sint
          voluptate laboriosam saepe earum officiis fuga excepturi, rerum ea,
          consequuntur fugit? In nihil illo quisquam similique maiores dolor
          beatae! Odit! Ad tempora impedit, modi quibusdam quis magnam! Nisi
          beatae aliquam ad ipsa consectetur facilis similique doloremque magnam
          aut sunt nihil veniam, iusto perferendis, rem sed maxime, odio non
          ratione quaerat. Provident reprehenderit, veniam veritatis labore
          natus officia? Eum inventore adipisci quas deleniti aut rerum saepe
          labore! Molestias, consectetur qui. Veritatis, blanditiis. Culpa et
          iusto ex quod placeat quae libero? Quos? Iure suscipit, tenetur harum
          itaque ullam praesentium! Eligendi repudiandae accusantium asperiores
        </div>
      </main>
    </HomePageLayout>
  );
}
