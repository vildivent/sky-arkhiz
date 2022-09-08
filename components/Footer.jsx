import Image from "next/image";
import { telescopeLogo } from "../public/assets";
import { style } from "../styles/style";
import Logo from "./Logo";
import { socialLinks, callLink } from "../constasnts";

const Footer = () => {
  return (
    <footer className="border-t border-white w-full text-left mx-auto px-10 ">
      <div className="grid sm:grid-flow-col grid-flow-row gap-5 sm:gap-10 text-center py-8">
        <div>
          <Logo
            src={telescopeLogo}
            alt="Ночные экскурсии"
            changedNavbar={false}
            verticalLogo={true}
            heading={"Ночные экскурсии"}
            description={"звёзды - это красиво"}
          />
        </div>
        <div className="">
          <h1 className={`${style.h2} text-[21px]`}>Контакты</h1>
          <div
            className={`${style.p} w-full flex justify-center text-center my-3 sm:my-10 opacity-80`}
          >
            <a
              href={callLink.link}
              rel="nofollow"
              className={`hover:text-cyan-500`}
            >
              <Image
                src={callLink.logo}
                alt={callLink.title}
                width={40}
                height={40}
              />
              <div className={` `}>+7 (928) 384-30-40</div>
            </a>
          </div>
          <div className={`flex justify-around max-w-[280px] mx-auto`}>
            {socialLinks.map((socialLink) => (
              <a
                key={socialLink.id}
                href={socialLink.link}
                target="_blank"
                rel="noreferrer"
              >
                <Image src={socialLink.logo} alt={socialLink.title} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white opacity-50 text-center sm:py-[30px] py-3">
        <span className="">Copyright © 2022</span>
      </div>
    </footer>
  );
};

export default Footer;
