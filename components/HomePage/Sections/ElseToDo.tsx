import { motion } from "framer-motion";
import { btaSmall, planetariumSmall } from "../../../public/assets";
import { MElseToDoCard } from "../../Cards/ElseToDoCard";

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
const rightAnimation = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.1, duration: 0.3 },
  }),
};
const headingAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.1, duration: 0.4 },
  }),
};

const ElseToDo = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.1, once: true }}
      className="p-5 flex flex-col gap-10 overflow-hidden"
    >
      <motion.h2
        variants={headingAnimation}
        custom={1}
        className="font-h1 text-3xl sm:text-4xl xl:text-5xl text-center"
      >
        Чем ещё заняться в Архызе
      </motion.h2>
      <div className="flex flex-wrap justify-center gap-5">
        <MElseToDoCard
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1, once: true }}
          variants={leftAnimation}
          custom={1}
          title="Можете посетить наш планетарий"
          href="/what-else-to-do-in-Arkhyz/planetarium/"
          imgSrc={planetariumSmall}
        />

        <MElseToDoCard
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1, once: true }}
          variants={rightAnimation}
          custom={2}
          title="Или заглянуть на экскурсию в обсерваторию"
          href="/what-else-to-do-in-Arkhyz/tours-to-the-observatory/"
          imgSrc={btaSmall}
        />
      </div>
    </motion.section>
  );
};

export default ElseToDo;
