import { motion } from "framer-motion";
import Link from "next/link";
import { style } from "../../../styles/style";
import { ActionButton } from "../../Buttons";

const textAnimation = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.1, duration: 0.4 },
  }),
};

const About = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2, once: true }}
      className="flex flex-col gap-5 overflow-hidden items-center p-5"
    >
      <motion.h2
        variants={textAnimation}
        custom={2}
        className="font-h1 text-3xl text-center sm:text-4xl xl:text-5xl"
      >
        Экскурсовод
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.4, once: true }}
        className="flex flex-col justify-center text-center gap-5"
      >
        <motion.p className="m-0 font-bold" variants={textAnimation} custom={5}>
          Дмитрий Владимирович Гунько
        </motion.p>
        <motion.p className="m-0" variants={textAnimation} custom={8}>
          Сотрудник Специальной Астрофизической Обсерватории Российской Академии
          Наук (САО РАН)
        </motion.p>
        <div>
          <motion.div
            variants={textAnimation}
            custom={10}
            className="flex justify-center"
          >
            <Link href="/about/">
              <a>
                <ActionButton className={style.button}>Подробнее</ActionButton>
              </a>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default About;
