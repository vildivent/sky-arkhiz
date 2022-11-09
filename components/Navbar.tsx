import { IoMenu } from "react-icons/io5";
import Logo from "./Logo";
import useNavbarOnScroll from "../utils/hooks/useNavbarOnScroll";
import { NavLinks } from "../constasnts";
import NavLink from "./NavLink";

const Navbar = ({ setSidebarIsOpened, navLinks }: NavbarProps) => {
  const { showNavbar, transparentStyle } = useNavbarOnScroll();

  return (
    <nav
      className={`fixed z-10 top-0 left-0 right-0 flex justify-around text-center border-b border-cyan-500 transition-all duration-300 ${
        showNavbar ? "" : "translate-y-[-6rem]"
      } ${
        transparentStyle
          ? "bg-transparent text-white border-none"
          : "bg-[#1e1e1e] text-cyan-500"
      }`}
    >
      <Logo transparentStyle={transparentStyle} textShadow={true} />

      <ul className="lg:flex hidden flex-row justify-center text-center">
        {navLinks.map(
          (link) =>
            link.mainNavbar && (
              <NavLink key={link.id} transparentStyle={transparentStyle}>
                {link}
              </NavLink>
            )
        )}
      </ul>

      {/* menu button */}
      <button
        className={`cursor-pointer text-4xl px-3 ${
          transparentStyle
            ? "text-white hover:text-cyan-500"
            : "text-cyan-500 hover:text-white"
        }`}
        onClick={() => setSidebarIsOpened((prev: boolean) => !prev)}
      >
        <IoMenu />
      </button>
    </nav>
  );
};
export default Navbar;

type NavbarProps = {
  setSidebarIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  navLinks: NavLinks;
};
