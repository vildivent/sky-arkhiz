import { HomePageLayout } from "../layouts/HomePageLayout";
import Hero from "../components/HomePage/Sections/Hero";
import AboutExcursions from "../components/HomePage/Sections/AboutExcursions";
import Webcams from "../components/HomePage/Sections/Webcams";
import Gallery from "../components/HomePage/Sections/Gallery";
import AstronomyCards from "../components/HomePage/Sections/AstronomyCards";
import ElseToDo from "../components/HomePage/Sections/ElseToDo";
import Request from "../components/HomePage/Sections/Request";

export default function Home() {
  const buttonStyle = "text-lg sm:px-10 px-8 py-2 sm:rounded-lg rounded-md";

  return (
    <HomePageLayout title={"Главная"}>
      <main>
        <Hero />
        <AboutExcursions />
        <Gallery />
        <AstronomyCards />
        <Webcams />
        <ElseToDo />
        <Request />
      </main>
    </HomePageLayout>
  );
}
