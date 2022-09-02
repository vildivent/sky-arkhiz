import Image from "next/image";
import Link from "next/link";

const CTACard = ({ heading, description, img, alt, link }) => {
  return (
    <div
      className={`flex flex-col justify-around border border-cyan-500 items-center text-center w-[300px] h-[400px] m-5`}
    >
      <h1 className={`font-h1 text-[27px] my-5`}>{heading}</h1>
      <Image
        src={img}
        alt={alt}
        objectFit="cover"
        quality={100}
        placeholder="blur"
      />
      <p className={`font-h1 text-[20px]`}>{description}</p>
      <Link href={link || "/"}>
        <a>
          <button
            className={`hover:text-cyan-500 hover:top-[2px] relative border border-cyan-500 rounded-full py-3 px-7 mb-5`}
          >
            Подробнее
          </button>
        </a>
      </Link>
    </div>
  );
};

export default CTACard;
