import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ActiveLink from "./ActiveLink";
import {
  menuCyanIcon,
  menuWhiteIcon,
  telescopeLogo,
  telescopeLogoCyan,
} from "../public/assets";
import Logo from "./Logo";
import MenuButton from "./MenuButton";

export default function Navbar({ setSidebarIsOpened, navLinks }) {
  const router = useRouter();

  const [showNavbar, setShowNavbar] = useState(true);
  const [changedNavbar, setChangedNavbar] = useState(
    router.pathname === "/" ? false : true
  );
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // if scroll down hide the navbar
          setShowNavbar(false);
        } else {
          // if scroll up show the navbar
          setShowNavbar(true);
        }
        if (window.scrollY < 200) {
          //set default navbar to top
          if (router.pathname === "/") setChangedNavbar(false);
        } else {
          //change navbar in other positions
          setChangedNavbar(true);
        }

        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY, router.pathname]);

  return (
    <nav
      className={`${
        !showNavbar
          ? "opacity-0 pointer-events-none absolute top-[-80px] left-0 right-0 "
          : ""
      } ${
        changedNavbar
          ? "bg-[#1e1e1e] lg:pb-0 text-cyan-500"
          : "bg-transperent border-none text-white"
      } fixed z-10 top-0 left-0 right-0 flex flex-row justify-around text-center border-b border-cyan-500 transition-all duration-500`}
    >
      <Logo
        className={`my-3`}
        src={changedNavbar ? telescopeLogoCyan : telescopeLogo}
        alt="Ночные экскурсии"
        changedNavbar={changedNavbar}
        heading={"Ночные экскурсии"}
        description={"звёзды - это красиво"}
        verticalLogo={false}
        textShadow={true}
      />
      <ul className="lg:flex hidden flex-row justify-center text-center">
        {navLinks.map((link) => {
          if (link.mainNavbar) {
            return (
              <li
                key={link.id}
                className={`flex flex-col justify-center mb-[1px] ${
                  changedNavbar
                    ? "hover:text-white hover:bg-[#181818]"
                    : "hover:text-cyan-500 text-shadow link"
                }`}
              >
                <ActiveLink
                  href={link.id}
                  changedNavbar={changedNavbar}
                  link={link.subLinks ? link : undefined}
                >
                  {link.title}
                </ActiveLink>
              </li>
            );
          }
        })}
      </ul>
      <MenuButton
        className={`flex flex-col justify-center py-auto px-5`}
        srcState={changedNavbar}
        src1={menuWhiteIcon}
        src2={menuCyanIcon}
        alt="menu"
        onClick={() => setSidebarIsOpened((prev) => !prev)}
      />
    </nav>
  );
}
