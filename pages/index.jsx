import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { HomePageLayout } from "../layouts/HomePageLayout";
import {
  Hero,
  AboutExcursions,
  Webcams,
  Gallery,
  AstronomyCards,
  ElseToDo,
  Request,
} from "../components/HomePage/Sections";

export default function Home() {
  const getReferalCookie = async (ref) =>
    await axios.get("api/referral", { params: { ref } });
  const router = useRouter();

  useEffect(() => {
    if (router.query.ref) {
      getReferalCookie(router.query.ref);
      router.push("/");
    }
  }, [router]);

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
