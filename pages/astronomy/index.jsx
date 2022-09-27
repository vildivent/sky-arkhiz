import { MainLayout } from "../../layouts/MainLayout";
import { cardImage1 } from "../../public/assets";
import AstronomyCard from "../../components/AstronomyCard";

export default function Astronomy() {
  return (
    <MainLayout title={"Блог: Статьи по астрономии"}>
      <div className="flex flex-wrap gap-5 sm:gap-10 justify-center mt-5 sm:mt-10">
        <AstronomyCard
          href="/astronomy/telescopes/"
          imageSrc={cardImage1}
          title="Телескопы"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum euismod felis, vel egestas risus porta bibendum euismod felis, vel egestas risus porta"
        />
        <AstronomyCard
          href="/astronomy/what-you-can-see-with-a-telescope/"
          imageSrc={cardImage1}
          title="Что можно увидеть в телескоп"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum euismod felis, vel egestas risus porta bibendum euismod felis, vel egestas risus porta"
        />
      </div>
    </MainLayout>
  );
}
