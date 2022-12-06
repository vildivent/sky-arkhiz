import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Hero,
  AboutExcursions,
  Webcams,
  Gallery,
  ElseToDo,
  Request,
} from "../components/HomePage/Sections";
import HomePageLayout from "../components/layouts/HomePageLayout";
import WhatYoullSee from "../components/HomePage/Sections/WhatYoullSee";
import About from "../components/HomePage/Sections/About";

const Home = () => {
  const getReferalCookie = async (ref: string | string[]) =>
    await axios.get("api/referral", { params: { ref } });

  const router = useRouter();

  useEffect(() => {
    if (router.query.ref) {
      getReferalCookie(router.query.ref);
      router.push("/");
    }
  }, [router]);

  return (
    <HomePageLayout
      title="Главная"
      description="Запишитесь на экскурсию, и Вы сможете посмотреть через телескоп на звёздное небо, а текже узнать много нового про нашу вселенную."
    >
      <main>
        <Hero />
        <AboutExcursions />
        <Gallery />
        <WhatYoullSee />
        <About />
        <Webcams />
        <ElseToDo />
        <Request />
      </main>
    </HomePageLayout>
  );
};

export default Home;
