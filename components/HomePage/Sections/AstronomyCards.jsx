import { motion } from "framer-motion";
import { cardImage1 } from "../../../public/assets";
import { MAstronomyCard } from "../../Cards/AstronomyCard";

const textAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: (custom) => ({
    opacity: 1,
    transition: { delay: custom * 0.1, duration: 0.4 },
  }),
};
const leftAnimation = {
  hidden: {
    x: -50,
    opacity: 0,
  },
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.1, duration: 0.3 },
  }),
};

const AstronomyCards = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.1 }}
      className="p-5"
    >
      <motion.h2
        variants={textAnimation}
        custom={1}
        className="font-h1 text-3xl sm:text-4xl xl:text-5xl text-center my-5 sm:mb-10"
      >
        Блог: Статьи по астрономии
      </motion.h2>
      <div className="flex flex-wrap gap-5 sm:gap-10 justify-center">
        <MAstronomyCard
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
          variants={leftAnimation}
          custom={1}
          href="/astronomy/telescopes/"
          imageSrc={cardImage1}
          title="Телескопы"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum euismod felis, vel egestas risus porta bibendum euismod felis, vel egestas risus"
        />
        <MAstronomyCard
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
          variants={leftAnimation}
          custom={2}
          href="/astronomy/what-you-can-see-with-a-telescope/"
          imageSrc={cardImage1}
          title="Что можно увидеть в телескоп"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum euismod felis, vel egestas risus porta bibendum euismod felis, vel egestas risus"
        />
      </div>
    </motion.section>
  );
};

export default AstronomyCards;
