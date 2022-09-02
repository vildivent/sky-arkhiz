import { navLinks } from "../constasnts";
import { closeCyanIcon } from "../public/assets";
import Image from "next/image";
import ActiveLink from "./ActiveLink";

const Sidebar = ({ sidebarIsOpened, setSidebarIsOpened }) => {
  return (
    <div
      className={`${
        sidebarIsOpened
          ? "block"
          : "opacity-0 pointer-events-none absolute top-[-200px]"
      }  max-w-[475px] h-auto absolute top-0 right-0 bg-[#1e1e1e] border-b border-l border-cyan-500 transition-all duration-500 p-20 pt-28 z-20`}
    >
      <div className="absolute top-10 right-10 cursor-pointer mb-5 ml-auto">
        <Image
          src={closeCyanIcon}
          alt="close"
          width={30}
          height={30}
          onClick={() => setSidebarIsOpened(() => false)}
        />
      </div>
      <ul className="flex flex-col justify-center">
        {navLinks.map((link) => (
          <li key={link.id} className="mb-5">
            <ActiveLink href={link.id} changedNavbar={true} sidebar={true}>
              {link.title}
            </ActiveLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
