import { useState, useEffect } from "react";
import logo from "../public/assets/telescope-logo1.svg";
import { style } from "../styles/style";
import Logo from "./Logo";

const Footer = () => {
  // const [fixed, setFixed] = useState(true);
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("scroll", () =>
  //       document.body.scrollHeight - document.scrollTop ===
  //       document.body.clientHeight
  //         ? setFixed(true)
  //         : setFixed(false)
  //     );

  //     return () => {
  //       window.removeEventListener("scroll", () =>
  //         document.body.scrollHeight - document.scrollTop ===
  //         document.body.clientHeight
  //           ? setFixed(true)
  //           : setFixed(false)
  //       );
  //     };
  //   }
  // }, []);

  // console.log(fixed);
  return (
    <footer className="border-t border-white w-full text-left mx-auto">
      <div className="grid sm:grid-flow-col grid-flow-row gap-5 sm:gap-10 text-center sm:py-[80px] py-8">
        <Logo
          src={logo}
          alt="Ночные экскурсии"
          changedNavbar={false}
          heading={"Ночные экскурсии"}
          description={"звёзды - это красиво"}
        />
        <div className="">
          <h1 className={`${style.h2} text-[21px] mb-3`}>Контакты</h1>
          <p
            className={`${style.p} w-full grid flex-col sm:gap-4 gap-1 opacity-80`}
          >
            <span>+7 (812) 123-45-67</span>
            <span>+7 (911) 123-45-67</span>
          </p>
        </div>
        <div className="">
          <h1 className={`${style.h2} text-[21px] mb-3`}>Режим работы</h1>
          <p className={`${style.p} grid flex-col sm:gap-4 gap-1 opacity-80`}>
            <span>C 10:00 до 21:00 (Пн-Пт)</span>
            <span>С 11:00 до 20:00 (Сб-Вс)</span>
          </p>
        </div>
      </div>
      <div className="border-t border-white opacity-50 text-center sm:py-[30px] py-3">
        <span className="">Copyright © 2022</span>
      </div>
    </footer>
  );
};
export default Footer;
