import logo from "../public/assets/telescope-logo1.svg";
import { style } from "../styles/style";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="border-t border-white w-full text-left mx-auto px-10">
      <div className="grid sm:grid-flow-col grid-flow-row gap-5 sm:gap-10 text-center sm:py-[80px] py-8">
        <div>
          <Logo
            src={logo}
            alt="Ночные экскурсии"
            changedNavbar={false}
            verticalLogo={true}
            heading={"Ночные экскурсии"}
            description={"звёзды - это красиво"}
          />
        </div>
        <div className="">
          <h1 className={`${style.h2} text-[21px] mb-3`}>Контакты</h1>
          <p
            className={`${style.p} w-full grid flex-col sm:gap-4 gap-1 opacity-80`}
          >
            <a
              href="tel:+79283843040"
              rel="nofollow"
              className={`hover:text-cyan-500`}
            >
              <span>+7 (928) 384-30-40</span>
            </a>
          </p>
        </div>
        {/* <div className="">
          <h1 className={`${style.h2} text-[21px] mb-3`}>Режим работы</h1>
          <p className={`${style.p} grid flex-col sm:gap-4 gap-1 opacity-80`}>
            <span>C 10:00 до 21:00 (Пн-Пт)</span>
            <span>С 11:00 до 20:00 (Сб-Вс)</span>
          </p>
        </div> */}
      </div>
      <div className="border-t border-white opacity-50 text-center sm:py-[30px] py-3">
        <span className="">Copyright © 2022</span>
      </div>
    </footer>
  );
};
export default Footer;
