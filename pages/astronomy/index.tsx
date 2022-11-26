import { AstronomyCard } from "../../components/Cards/AstronomyCard";
import { MainLayout } from "../../components/layouts/MainLayout";
import { cardImage1 } from "../../public/assets";

const Astronomy = () => {
  return (
    <MainLayout title="Блог: Статьи по астрономии">
      <div className="flex flex-wrap gap-5 sm:gap-10 justify-center mt-5 sm:mt-10">
        <AstronomyCard
          href="/astronomy/telescopes/"
          imageSrc={cardImage1}
          title="Телескопы"
          description="Статья находится на стадии написания"
        />
        <AstronomyCard
          href="/astronomy/what-you-can-see-with-a-telescope/"
          imageSrc={cardImage1}
          title="Что можно увидеть в телескоп"
          description="Статья находится на стадии написания"
        />
      </div>
    </MainLayout>
  );
};
export default Astronomy;
