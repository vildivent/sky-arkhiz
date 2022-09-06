import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { navLinks } from "../constasnts";
import ActiveLink from "./ActiveLink";
import {
  menuCyanIcon,
  menuWhiteIcon,
  telescopeLogo,
  telescopeLogoCyan,
} from "../public/assets";
import Logo from "./Logo";

export default function Navbar({ setSidebarIsOpened }) {
  const router = useRouter();

  const [showNavbar, setShowNavbar] = useState(true);
  const [changedNavbar, setChangedNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          // if scroll down hide the navbar
          setShowNavbar(false);
        } else {
          // if scroll up show the navbar
          setShowNavbar(true);
        }
        if (window.scrollY === 0) {
          //set default navbar to top
          setChangedNavbar(false);
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

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav
      className={`${
        !showNavbar
          ? "opacity-0 pointer-events-none absolute top-[-80px] left-0 right-0 "
          : undefined
      } ${
        changedNavbar
          ? "bg-[#1e1e1e] lg:pb-0 text-cyan-500"
          : "bg-transperent border-none"
      } fixed z-10 top-0 left-0 right-0 flex flex-row justify-around text-center lg:border-none border-b border-cyan-500 text-white p-5 pb-0 transition-all duration-500`}
    >
      <Logo
        src={changedNavbar ? telescopeLogoCyan : telescopeLogo}
        alt="Ночные экскурсии"
        changedNavbar={changedNavbar}
        heading={"Ночные экскурсии"}
        description={"звёзды - это красиво"}
        verticalLogo={false}
      />
      <ul className="lg:flex hidden flex-row justify-center text-center">
        {navLinks.map((link) => {
          if (link.mainNavbar) {
            if (link.subLinks) {
              return (
                <li key={link.id}>
                  <ActiveLink
                    href={link.id}
                    changedNavbar={changedNavbar}
                    link={link}
                  >
                    {link.title}
                  </ActiveLink>
                </li>
              );
            } else {
              return (
                <li key={link.id}>
                  <ActiveLink href={link.id} changedNavbar={changedNavbar}>
                    {link.title}
                  </ActiveLink>
                </li>
              );
            }
          }
        })}
      </ul>
      <div className={`flex flex-col justify-start`}>
        <button
          className={`hover:bottom-[2px] hover:relative mb-auto`}
          onClick={() => setSidebarIsOpened((prev) => !prev)}
        >
          <Image
            src={changedNavbar ? menuCyanIcon : menuWhiteIcon}
            alt="menu"
            quality={100}
            width={40}
            height={40}
          />
        </button>
      </div>
    </nav>
  );
}
