import Image from "next/image";
import Link from "next/link";
import ActionButton from "./Buttons/ActionButton";

const ElseToDoCard = ({ title, href, imgSrc }) => {
  return (
    <div className="w-full flex justify-center gap-5">
      <div className="flex flex-col justify-center gap-5 sm:gap-10 w-3/4">
        <h3 className="font-h1 text-xl sm:text-2xl xl:text-3xl text-center">
          {title}
        </h3>
        <Link href={href}>
          <a>
            <div className="flex justify-center">
              <ActionButton
                title="Подробнее"
                className="text-lg sm:px-10 px-8 py-2 sm:rounded-lg rounded-md"
              />
            </div>
          </a>
        </Link>
      </div>
      <div className="w-1/4 flex flex-col justify-center">
        <Image
          src={imgSrc}
          alt={title}
          placeholder="blur"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default ElseToDoCard;
