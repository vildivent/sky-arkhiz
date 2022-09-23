import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import ActiveLink from "./ActiveLink";

const SidebarSubLinks = ({ link, activeSubMenu, setActiveSubMenu }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    link.id === activeSubMenu ? setSubMenuOpen(true) : setSubMenuOpen(false);
  }, [activeSubMenu, link.id]);

  const clickHanlder = (e) => {
    e.preventDefault();
    if (setActiveSubMenu !== undefined) setActiveSubMenu(link.id);
    setSubMenuOpen((value) => !value);
    if (!link.subLinks && !link.noLink)
      router.push(`${link.id === "/" ? "/" : `/${link.id}`}`);
  };
  return (
    <>
      <li
        key={link.id}
        onClick={clickHanlder}
        className={`flex justify-between px-5 hover:bg-[#181818] hover:text-white cursor-pointer ${
          subMenuOpen ? "bg-[#181818]" : ""
        }`}
      >
        {!link.noLink && !link.subLinks ? (
          <ActiveLink href={link.id} changedNavbar={true} sidebar={true}>
            {link.title}
          </ActiveLink>
        ) : (
          <span className={`py-2`}>{link.title}</span>
        )}
        {link.subLinks ? (
          <span className={`font-bold relative ml-5 my-auto `}>
            {subMenuOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </span>
        ) : (
          <></>
        )}
      </li>

      {/* submenu */}
      {link.subLinks ? (
        <div className={`${subMenuOpen ? "" : "h-0 border-none"}`}>
          {!link.noLink ? (
            <li
              className={`${
                subMenuOpen
                  ? "transition-all duration-300"
                  : "opacity-0 pointer-events-none translate-y-[20px]"
              } list cursor-pointer hover:text-white hover:bg-[#181818] pl-10`}
              onClick={() => router.push(`/${link.id}`)}
            >
              <ActiveLink
                href={`${link.id}`}
                changedNavbar={true}
                sidebar={true}
              >
                {`${link.subTitle}`}
              </ActiveLink>
            </li>
          ) : (
            <></>
          )}
          {link.subLinks.map((subLink) => (
            <li
              key={subLink.id}
              className={`${
                subMenuOpen
                  ? "transition-all duration-300"
                  : "opacity-0 pointer-events-none translate-y-[20px]"
              } list cursor-pointer hover:text-white hover:bg-[#181818] pl-10`}
              onClick={() => router.push(`/${link.id}/${subLink.id}`)}
            >
              <ActiveLink
                href={`${link.id}/${subLink.id}`}
                changedNavbar={true}
                sidebar={true}
              >
                {`${subLink.title}`}
              </ActiveLink>
            </li>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SidebarSubLinks;
