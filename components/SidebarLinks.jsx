import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ActiveLink from "./ActiveLink";

const SidebarSubLinks = ({ link }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const router = useRouter();
  const clickHanlder = (e) => {
    e.preventDefault();
    setSubMenuOpen((value) => !value);
    if (!link.subLinks && !link.noLink)
      router.push(`${link.id === "/" ? "/" : `/${link.id}`}`);
  };
  return (
    <>
      <li
        key={link.id}
        onClick={clickHanlder}
        className={`pb-5 flex justify-between hover:bg-[#181818] ${
          !link.noLink ? "cursor-pointer" : ""
        }`}
      >
        {!link.noLink ? (
          <ActiveLink href={link.id} changedNavbar={true} sidebar={true}>
            {link.title}
          </ActiveLink>
        ) : (
          <span className={`text-start text-cyan-500 `}>{link.title}</span>
        )}
        {link.subLinks ? (
          <span className={`font-bold text-cyan-500 relative ml-5`}>
            {subMenuOpen ? "-" : "+"}
          </span>
        ) : (
          <></>
        )}
      </li>

      {link.subLinks ? (
        <div className={`${subMenuOpen ? "" : "h-0 "}`}>
          {link.subLinks.map((subLink) => (
            <li
              key={subLink.id}
              className={`${
                subMenuOpen
                  ? ""
                  : "opacity-0 pointer-events-none translate-y-[-40px]"
              } list pb-5 px-5 cursor-pointer ${
                subMenuOpen ? "transition-all duration-300" : ""
              } hover:bg-[#181818]`}
              onClick={() => router.push(`/${link.id}/${subLink.id}`)}
            >
              <ActiveLink
                href={`${link.id}/${subLink.id}`}
                changedNavbar={true}
                sidebar={true}
              >
                {`- ${subLink.title}`}
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
