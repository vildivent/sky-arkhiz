import { useState } from "react";
import { motion } from "framer-motion";
import ImageSlider from "../../ImageSlider";
import "react-slideshow-image/dist/styles.css";
import useDimentions from "../../../utils/hooks/useDimetions";

const textAnimation = {
  hidden: {
    x: 80,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.4 },
  }),
};
const headingAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.15, duration: 0.4 },
  }),
};

const WhatYoullSee = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { windowDimentions } = useDimentions();
  const ratio = (100 * windowDimentions.width) / windowDimentions.height;
  const size = `h-[${ratio.toFixed(0)}vh]`;

  return (
    <section
      className={`h-full w-full flex flex-col sm:flex-row justify-around overflow-hidden sm:px-5`}
    >
      <div className="flex flex-col justify-center">
        <motion.h2
          variants={headingAnimation}
          custom={1}
          className="font-h1 text-3xl sm:text-4xl xl:text-5xl text-center my-5"
        >
          Как видно глазом в телескоп
        </motion.h2>
        <button
          className="mb-5 mx-auto"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Подробнее
        </button>
        <div
          className={`transition-all duration-300 ${
            isOpen ? `${size}` : "h-[0vh] pointer-events-none"
          }`}
        >
          <div className={`sm:w-[80vw] w-[100vw] mx-auto ${isOpen ? "" : ""}`}>
            <ImageSlider />
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1, once: true }}
            className={`mx-10`}
          >
            <motion.p variants={textAnimation} custom={1} className="">
              Красочные изображения, какие все привыкли видеть на фотографиях в
              интернете, глазом через телескоп вы не сможете увидеть.
            </motion.p>
            <motion.p variants={textAnimation} custom={2} className="">
              К сожалению наши глаза не фотоаппараты и имеют ограниченную
              чувствительность. К тому же атмосфера Земли искажает видимость
              космических объектов.
            </motion.p>
            <motion.p variants={textAnimation} custom={3} className="">
              Однако с лёгкостью можно наблюдать в телескоп кратеры на Луне,
              облака на Юпитере и его спутники, кольца Сатурна, ледяную шапку на
              полюсе Марса, различные звёздные скопления.
            </motion.p>
            <motion.p variants={textAnimation} custom={4} className="">
              А при чистой атмосфере, отсутствии засветки и нужной подготовке
              глаз, возможно рассмотреть туманности и далёкие галактики.
            </motion.p>
            <motion.p variants={textAnimation} custom={5} className="">
              Заглянув в телескоп вы получите возможность собственными глазами
              увидеть интересные космические объекты и получите массу приятных
              эмоций и впечатлений.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatYoullSee;
