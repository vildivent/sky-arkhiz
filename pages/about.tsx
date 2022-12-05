import React from "react";
import { MainLayout } from "../components/layouts/MainLayout";

const About = () => {
  return (
    <MainLayout title="Обо мне">
      <p className="mt-5">Дмитрий Владимирович Гунько</p>
      <p className="mt-5">
        Сотрудник Специальной Астрофизической Обсерватории Российской Академии
        Наук (САО РАН)
      </p>
      <p className="mt-5">Штатный экскурсовод САО РАН более 20 лет.</p>
      <p className="mt-5">Провожу ночные экскурсии более 10 лет.</p>
    </MainLayout>
  );
};

export default About;
