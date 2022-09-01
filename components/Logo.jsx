import Link from "next/link";
import Image from "next/image";

const Logo = ({ src, alt, heading, description, changedNavbar }) => {
  const logoStyleH1 = "";
  const logoStyleP = "";

  return (
    <div className={`text-center whitespace-nowrap`}>
      <Link href={"/"}>
        <a className={`${changedNavbar ? "flex justify-start" : undefined}`}>
          <Image src={src} alt={alt} width={40} height={40} />
          <div
            className={`${changedNavbar ? "pl-5 text-cyan-500" : undefined}`}
          >
            <h1 className={` font-logo-h1 text-[21px] leading-[100%]`}>
              {heading}
            </h1>
            <p className={` font-logo-p italic text-[12px] leading-[100%]`}>
              {description}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Logo;
