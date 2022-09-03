import { useState } from "react";
import ActiveLink from "./ActiveLink";

const SidebarSubLinks = ({ link }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  return (
    <>
      <li
        key={link.id}
        onClick={() => setSubMenuOpen((value) => !value)}
        className={`pb-5 flex justify-between hover:bg-[#181818] ${
          link.subLinks ? "cursor-pointer" : ""
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
              } list pb-5 px-5 ${
                subMenuOpen ? "transition-all duration-300" : ""
              } hover:bg-[#181818]`}
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
