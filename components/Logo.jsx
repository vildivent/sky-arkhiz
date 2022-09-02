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
  const logoStyleH1 = "";
  const logoStyleP = "";

  return (
    <Link href={"/"}>
      <div className={`text-center whitespace-nowrap cursor-pointer`}>
        <a className={`${!verticalLogo ? "flex justify-start" : ""}`}>
          <Image src={src} alt={alt} width={40} height={40} />
          <div
            className={`${!verticalLogo ? "pl-5" : ""} ${
              changedNavbar ? " text-cyan-500" : undefined
            }`}
          >
            <h1 className={` font-logo-h1 text-[21px] leading-[100%]`}>
              {heading}
            </h1>
            <p className={` font-logo-p italic text-[12px] leading-[100%]`}>
              {description}
            </p>
          </div>
        </a>
      </div>
    </Link>
  );
};

export default Logo;
