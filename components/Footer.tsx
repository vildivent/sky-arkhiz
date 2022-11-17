import Image from "next/image";
import { style } from "../styles/style";
import Logo from "./Logo";
import { socialLinks, callLink } from "../constasnts";
import { ActionButton } from "./Buttons";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-white w-full text-left mx-auto px-10 border-opacity-50 bg-[#1e1e1e] bg-opacity-75">
      <div className="flex flex-col sm:flex-row justify-center gap-5 sm:gap-40 text-center py-8">
        <div className="flex flex-col items-center sm:gap-10 gap-5">
          <Logo transparentStyle={true} verticalLogo={true} />

          <Link href="/request">
            <a>
              <ActionButton className="text-lg sm:px-10 px-8 py-2 sm:rounded-lg rounded-md">
                Оставить заявку
              </ActionButton>
            </a>
          </Link>
        </div>
        <div className="">
          <h1 className={`${style.h2} text-[21px]`}>Контакты</h1>
          <div
            className={`${style.p} w-full flex justify-center text-center my-3 sm:my-10 opacity-80`}
          >
            <a
              href={callLink.link}
              rel="nofollow"
              className={`hover:text-cyan-500 hover:translate-y-[1px]`}
            >
              <Image
                src={callLink.logo}
                alt={callLink.title}
                width={40}
                height={40}
              />
              <div>+7 (928) 384-30-40</div>
            </a>
          </div>
          <div
            className={`flex justify-around max-w-[280px] mx-auto flex-wrap`}
          >
            {socialLinks.map((socialLink) => (
              <a
                className={`hover:translate-y-[1px]`}
                key={socialLink.id}
                href={socialLink.link}
                target="_blank"
                rel="noreferrer"
              >
                {socialLink.id === "nowapp" ? (
                  <div className="p-1">
                    <Image
                      className="rounded-md"
                      src={socialLink.logo}
                      alt={socialLink.title}
                      width={40}
                      height={40}
                    />
                  </div>
                ) : (
                  <Image src={socialLink.logo} alt={socialLink.title} />
                )}
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
