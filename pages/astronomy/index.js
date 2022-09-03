import { MainLayout } from "../../components/MainLayout";
import CTACard from "../../components/CTACard";
import { roadToStarsTelescope } from "../../public/assets";

export default function Astronomy() {
  return (
    <MainLayout title={"Блог: Статьи по астрономии"}>
      <main>
        <h1 className={`text-center py-[125px] text-[72px] font-h1 `}>
          Блог: Статьи по астрономии
        </h1>
        <div className={`flex justify-around flex-wrap`}>
          <CTACard
            heading={"Что можно увидеть в телескоп"}
            description={""}
            img={roadToStarsTelescope}
            alt={"Телескоп"}
            link={"/astronomy/what-you-can-see-with-a-telescope"}
            opacity={50}
          />
          <CTACard
            heading={"Телескопы"}
            description={""}
            img={roadToStarsTelescope}
            alt={"Телескоп"}
            link={"/astronomy/telescopes"}
            opacity={50}
          />
        </div>
      </main>
    </MainLayout>
  );
}
