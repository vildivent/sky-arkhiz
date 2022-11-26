import SidebarSubLinks from "./SidebarLinks";
import { useState } from "react";
import SidebarCloseButton from "./Buttons/SidebarCloseButton";
import { NavLinks } from "../constasnts";

const Sidebar = ({
  sidebarIsOpened,
  setSidebarIsOpened,
  navLinks,
  handleLogout,
}: TSidebarProps) => {
  const [activeSubMenu, setActiveSubMenu] = useState("");

  const closeHandler = () => {
    setSidebarIsOpened(() => false);
    setActiveSubMenu("");
  };
  return (
    <div
      className={`${
        sidebarIsOpened
          ? "fixed w-full h-full z-20 bg-[#1e1e1e] bg-opacity-70 "
          : ""
      }`}
    >
      <div className={`w-full h-full`} onClick={() => closeHandler()}></div>
      <div
        className={`max-w-[475px] h-auto fixed top-0 bottom-0 right-0 overflow-y-auto overflow-x-hidden bg-[#1e1e1e] border-b border-l border-cyan-500 transition-all duration-500 pt-20 pb-5 z-20 ${
          sidebarIsOpened
            ? ""
            : "opacity-0 pointer-events-none translate-x-[300px]"
        }`}
      >
        <div className="absolute top-0 right-0 ml-auto">
          <SidebarCloseButton onClick={closeHandler} />
        </div>
        <ul className="flex flex-col justify-center text-cyan-500">
          {navLinks.map((link) => {
            return (
              <SidebarSubLinks
                key={link.id}
                link={link}
                activeSubMenu={activeSubMenu}
                setActiveSubMenu={setActiveSubMenu}
              />
            );
          })}
          {handleLogout && (
            <li
              className={`px-5 py-2 hover:bg-[#181818] hover:text-white cursor-pointer`}
              onClick={() => handleLogout()}
            >
              Выйти
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

type TSidebarProps = {
  sidebarIsOpened: boolean;
  setSidebarIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  navLinks: NavLinks;
  handleLogout?: () => void;
};
