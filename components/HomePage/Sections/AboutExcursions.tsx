import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { celestron } from "../../../public/assets";
import { style } from "../../../styles/style";
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
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2, once: true }}
      className={`xl:h-[90vh] sm:h-[100vh] w-full sm:pl-10 lg:pl-20 pt-2 px-2 `}
    >
      <div className="h-full w-full flex justify-between items-center sm:flex-row flex-col">
        <div className="sm:w-[100%] xl:w-[50%] xl:pb-20 pb-3 flex flex-col justify-center relative z-[1]">
          <motion.h2
            variants={textAnimation}
            custom={1}
            className={`font-h1 text-3xl sm:text-4xl xl:text-5xl my-5 sm:text-start text-center`}
          >
            Экскурсии
          </motion.h2>
          <div className="mx-auto text-start 2xl:text-xl">
            <motion.p
              variants={textAnimation}
              custom={2}
              viewport={{ amount: 0.2, once: true }}
              className="sm:w-[60%] mx-10 sm:mx-0 2xl:my-10"
            >
              У Вас есть желание заглянуть в глубины космоса и своими глазами
              увидеть интересные объекты Солнечной системы, нашей галактики и
              Вселенной?
            </motion.p>
            <motion.p
              variants={textAnimation}
              custom={3}
              viewport={{ amount: 0.2, once: true }}
              className="sm:w-[60%] sm:ml-[6vw] mx-10 sm:mx-0 2xl:my-10"
            >
              Мы поможем Вам это осуществить и погрузиться в удивительный мир
              астрономии и космоса.
            </motion.p>
            <motion.p
              variants={textAnimation}
              custom={4}
              viewport={{ amount: 0.2, once: true }}
              className="sm:w-[60%] sm:ml-[12vw] mx-10 sm:mx-0 2xl:my-10"
            >
              Вы сможете не только заглянуть в телескоп и прослушать интересную
              экскурсию, а также почувствовать неповторимую атмосферу ночного
              высокогорья!
            </motion.p>
          </div>
          <motion.div
            variants={textAnimation}
            custom={5}
            viewport={{ amount: 0.2, once: true }}
            className="flex sm:ml-[24vw] mt-5 sm:justify-start justify-center"
          >
            <Link href="/excursions/">
              <a>
                <ActionButton className={style.button}>Подробнее</ActionButton>
              </a>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={imgAnimation}
          viewport={{ amount: 0.2, once: true }}
          className="relative sm:h-full h-[100vw] sm:w-1/2 w-full"
        >
          <Image
            src={celestron}
            alt="celestron"
            layout="fill"
            objectFit="contain"
            objectPosition={"bottom"}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutExcursions;
