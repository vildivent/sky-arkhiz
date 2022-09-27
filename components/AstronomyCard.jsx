import Image from "next/image";
import Link from "next/link";

const AstronomyCard = ({ href, imageSrc, title, description }) => {
  return (
    <Link href={href}>
      <a>
        <div className="w-[350px] sm:h-[550px] bg-[#114883] hover:scale-[1.02] shadow-lg shadow-black">
          <Image src={imageSrc} alt={title} />
          <div className="p-5">
            <h3 className="font-h1 text-2xl sm:text-3xl xl:text-4xl text-center">
              {title}
            </h3>
            <p>{description}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AstronomyCard;
