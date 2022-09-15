import { MainLayout } from "../../layouts/MainLayout";
import CTACard from "../../components/CTACard";
import { roadToStarsTelescope } from "../../public/assets";

export default function Astronomy() {
  return (
    <MainLayout title={"Блог: Статьи по астрономии"}>
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
    </MainLayout>
  );
}
