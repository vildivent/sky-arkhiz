import { navLinks } from "../constasnts";
import { closeCyanIcon } from "../public/assets";
import Image from "next/image";
import SidebarSubLinks from "./SidebarLinks";

const Sidebar = ({ sidebarIsOpened, setSidebarIsOpened }) => {
  return (
    <div
      className={`${
        sidebarIsOpened
          ? "block"
          : "opacity-0 pointer-events-none translate-x-[100px]"
      }  max-w-[475px] h-auto fixed top-0 bottom-0 right-0 overflow-y-auto overflow-x-hidden bg-[#1e1e1e] border-b border-l border-cyan-500 transition-all duration-500 px-20 pt-28 pb-10 z-20`}
    >
      <div className="absolute top-10 right-10 cursor-pointer mb-5 ml-auto">
        <button
          className={`hover:w-[90%] hover:h-[90%]`}
          onClick={() => setSidebarIsOpened(() => false)}
        >
          <Image src={closeCyanIcon} alt="close" width={30} height={30} />
        </button>
      </div>
      <ul className="flex flex-col justify-center ">
        {navLinks.map((link) => {
          return <SidebarSubLinks key={link.id} link={link} />;
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
