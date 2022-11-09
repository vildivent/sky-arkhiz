import Link from "next/link";
import Image from "next/image";
import { telescopeLogo, telescopeLogoCyan } from "../public/assets";

const Logo = ({ transparentStyle, verticalLogo, textShadow }: LogoProps) => {
  return (
    <Link href={"/"}>
      <a>
        <div
          className={`my-3 text-center whitespace-nowrap cursor-pointer ${
            !verticalLogo ? "flex justify-start" : ""
          }`}
        >
          <div
            className={`${!verticalLogo ? "flex flex-col justify-start" : ""}`}
          >
            <Image
              src={transparentStyle ? telescopeLogo : telescopeLogoCyan}
              alt="Ночные экскурсии"
              width={40}
              height={40}
            />
          </div>

          <div
            className={`flex flex-col justify-center ${
              !verticalLogo ? "pl-2 sm:pl-5" : ""
            } ${
              transparentStyle
                ? `${textShadow ? "text-shadow" : ""}`
                : "text-cyan-500"
            }`}
          >
            <h1 className="font-logo-h1 text-[21px] leading-[100%]">
              Ночные экскурсии
            </h1>
            <p className="font-logo-p italic text-[12px] leading-[100%] m-0">
              звёзды - это красиво
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Logo;

type LogoProps = {
  transparentStyle?: boolean;
  verticalLogo?: boolean;
  textShadow?: boolean;
};
