import type { NextPage } from "next";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Hero,
  AboutExcursions,
  Webcams,
  Gallery,
  AstronomyCards,
  ElseToDo,
  Request,
} from "../components/HomePage/Sections";
import HomePageLayout from "../components/layouts/HomePageLayout";

const Home: NextPage = () => {
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
    <HomePageLayout title="Главная">
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
};

export default Home;
