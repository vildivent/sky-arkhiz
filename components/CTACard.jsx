import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const CTACard = ({ heading, description, img, alt, link, opacity }) => {
  return (
    <div
      className={`block flex-col justify-around border border-cyan-500 items-center text-center w-[300px] h-[400px] m-5`}
    >
      <div className={styles.overlapGrid}>
        <div className={`flex flex-col justify-around font-h1 z-[1] mx-10`}>
          <h1 className={`text-[27px]`}>{heading}</h1>
          <span className={`text-[20px]`}>{description}</span>
          <button
            className={`hover:text-cyan-500 hover:top-[2px] hover:relative border border-cyan-500 rounded-full py-3`}
          >
            <Link href={link || "/"}>
              <a>Подробнее</a>
            </Link>
          </button>
        </div>

        <div className={`opacity-${opacity} z-0`}>
          <Image
            src={img}
            alt={alt}
            quality={100}
            placeholder="blur"
            layout="responsive"
            width={300}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default CTACard;
