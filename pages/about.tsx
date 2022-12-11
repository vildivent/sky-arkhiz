import Image from "next/image";
import React from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import { myPhoto } from "../public/assets";

const About = () => {
  const ratio = 1.5;
  return (
    <MainLayout
      title="Обо мне"
      description="Дмитрий Владимирович Гунько 
    Ведущий инженер Специальной Астрофизической Обсерватории Российской
    Академии Наук (САО РАН)
    Штатный экскурсовод САО РАН более 20 лет.
    Провожу ночные экскурсии более 10 лет."
    >
      <section className="flex flex-col justify-around sm:flex-row gap-5 md:gap-10 items-center mt-5">
        <div className="relative w-[40vh] h-[60vh] sm:w-[50vh] sm:h-[75vh] max-w-[90vw] shadow-xl">
          <Image
            src={myPhoto}
            layout="fill"
            objectFit="contain"
            alt="Дмитрий Владимирович Гунько"
            quality={100}
            placeholder="blur"
          />
        </div>
        <div className="flex flex-col gap-5 w-full sm:w-[35vw]">
          <p className="m-0 font-bold text-xl text-center sm:text-start">
            Дмитрий Владимирович Гунько
          </p>
          <p className="m-0">
            Ведущий инженер Специальной Астрофизической Обсерватории Российской
            Академии Наук (САО РАН)
          </p>
          <p className="m-0">Штатный экскурсовод САО РАН более 20 лет.</p>
          <p className="m-0">Провожу ночные экскурсии более 10 лет.</p>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
