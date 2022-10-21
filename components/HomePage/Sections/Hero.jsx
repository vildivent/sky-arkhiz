import { motion } from "framer-motion";
import Link from "next/link";
import useBackground from "../../../hooks/useBackground";
import {
  btaBg1,
  btaMobile,
  bta360Mobile,
  bta360,
  btaSquare,
  btaOriginal,
} from "../../../public/assets";
import { style } from "../../../styles/style";
import Background from "../../Background";
import { ActionButton } from "../../Buttons";

const textAnimation = {
  hidden: {
    y: -50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.1, duration: 0.4 },
  },
};
const buttonAnimation = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.3, duration: 0.4 },
  },
};

const Hero = () => {
  const bg = useBackground(btaSquare, bta360Mobile);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
      className="h-[100vh] lg:h-[150vh] relative"
    >
      <Background bg={bg} position="absolute">
        <motion.h1
          variants={textAnimation}
          className={`text-center sm:text-6xl text-5xl mt-20 sm:mt-10 2xl:mt-40 mb-5 font-h1 opacity-80 cursor-default text-shadow text-gray-100`}
        >
          Экскурсии по ночному небу
        </motion.h1>
        <motion.div
          variants={buttonAnimation}
          className="flex justify-center w-full"
        >
          <Link href="/request">
            <a>
              <ActionButton className={`${style.button} opacity-95`}>
                Оставить заявку
              </ActionButton>
            </a>
          </Link>
        </motion.div>
      </Background>
    </motion.section>
  );
};

export default Hero;
