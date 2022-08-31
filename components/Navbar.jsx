import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { navLinks } from "../constasnts";
import ActiveLink from "./ActiveLink";
import logo from "./../public/assets/telescope-logo1.svg";
import logoCyan from "./../public/assets/telescope-logo1-cyan.svg";
import Logo from "./Logo";

export default function Navbar() {
  const router = useRouter();

  const [showNavbar, setShowNavbar] = useState(true);
  const [changedNavbar, setChangedNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
        console.log(showNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav
      className={`${
        !showNavbar ? "hidden" : undefined
      } fixed top-0 left-0 right-0 flex flex-row justify-around text-center text-white bg-transparent p-5 ${
        changedNavbar ? "bg-[#1e1e1e] pb-0 text-cyan-500" : "bg-transperent"
      } `}
    >
      <Logo
        src={changedNavbar ? logoCyan : logo}
        alt="Ночные экскурсии"
        changedNavbar={changedNavbar}
        heading={"Ночные экскурсии"}
        description={"звёзды - это красиво"}
      />
      <ul className="flex flex-row justify-center text-center">
        {navLinks.map((link) => (
          <li key={link.id}>
            <ActiveLink href={link.id} changedNavbar={changedNavbar}>
              {link.title}
            </ActiveLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
