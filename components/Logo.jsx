import Link from "next/link";
import Image from "next/image";

const Logo = ({
  src,
  alt,
  heading,
  description,
  changedNavbar,
  verticalLogo,
}) => {
  return (
    <Link href={"/"}>
      <a>
        <div
          className={`${
            !verticalLogo ? "flex justify-start" : ""
          } text-center whitespace-nowrap cursor-pointer`}
        >
          <div
            className={`${!verticalLogo ? "flex flex-col justify-start" : ""}`}
          >
            <Image src={src} alt={alt} width={40} height={40} />
          </div>

          <div
            className={`${!verticalLogo ? "pl-5" : ""} ${
              changedNavbar ? " text-cyan-500" : undefined
            }`}
          >
            <h1 className={` font-logo-h1 text-[21px] leading-[100%]`}>
              {heading}
            </h1>
            <p className={` font-logo-p italic text-[12px] leading-[100%] m-0`}>
              {description}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Logo;
