import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { celestron } from "../../../public/assets";
import { style } from "../../../styles/style";
import useDimentions from "../../../utils/hooks/useDimetions";
import { ActionButton } from "../../Buttons";

const textAnimation = {
  hidden: {
    x: -50,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.15, duration: 0.25 },
  }),
};
const imgAnimation = {
  hidden: {
    y: 0,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.2, duration: 0.5 },
  },
};

const AboutExcursions = () => {
  const { windowDimentions } = useDimentions();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2, once: true }}
      className="flex flex-col gap-5 overflow-hidden items-center pt-5 px-5 bg-[#151515]"
    >
      <motion.h2
        variants={textAnimation}
        custom={1}
        className="font-h1 text-3xl text-center sm:text-4xl xl:text-5xl mx-5"
      >
        Экскурсии
      </motion.h2>
      <div className="h-full w-full flex flex-col sm:flex-row justify-between items-start sm:items-end">
        <div className="flex flex-col my-auto sm:w-[100%] pb-10 relative z-[1]">
          <div className="flex flex-col gap-5 justify-center items-start text-start 2xl:text-xl sm:ml-5">
            <motion.p
              variants={textAnimation}
              custom={2}
              viewport={{ amount: 0.2, once: true }}
              className="sm:w-[70%] sm:mr-auto my-0"
            >
              У Вас есть желание заглянуть в глубины космоса и своими глазами
              увидеть интересные объекты Солнечной системы, нашей галактики и
              Вселенной?
            </motion.p>
            <motion.p
              variants={textAnimation}
              custom={3}
              viewport={{ amount: 0.2, once: true }}
              className="sm:w-[70%] sm:mx-auto my-0"
            >
              Мы поможем Вам это осуществить и погрузиться в удивительный мир
              астрономии и космоса.
            </motion.p>
            <div className="flex flex-col gap-10 sm:w-[70%] ml-auto">
              <motion.p
                variants={textAnimation}
                custom={4}
                viewport={{ amount: 0.2, once: true }}
                className="my-0"
              >
                Вы сможете не только заглянуть в телескоп и прослушать
                интересную экскурсию, а также почувствовать неповторимую
                атмосферу ночного высокогорья!
              </motion.p>
              <motion.div
                variants={textAnimation}
                custom={6}
                viewport={{ amount: 0.2, once: true }}
                className="flex justify-center"
              >
                <Link href="/excursions/">
                  <a>
                    <ActionButton className={style.button}>
                      Подробнее
                    </ActionButton>
                  </a>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={imgAnimation}
          viewport={{ amount: 0.2, once: true }}
          className="flex flex-col justify-end lg:w-[80%] mx-auto"
        >
          <Image
            src={celestron}
            alt="celestron"
            objectFit="contain"
            objectPosition="bottom"
            height={windowDimentions.width * 0.8 || 800}
            width={windowDimentions.width * 0.8 || 800}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutExcursions;
