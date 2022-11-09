import { NavLink } from "../constasnts";
import ActiveLink from "./ActiveLink";

const NavLink = ({ children, transparentStyle = false }: NavLinkProps) => {
  return (
    <li
      key={children.id}
      className={`flex flex-col justify-center mb-[1px] ${
        transparentStyle
          ? "hover:text-cyan-500 text-shadow link"
          : "hover:text-white hover:bg-[#181818]"
      }`}
    >
      <ActiveLink href={children.id} transparentStyle={transparentStyle}>
        {children.title}
      </ActiveLink>
    </li>
  );
};

export default NavLink;

type NavLinkProps = {
  children: NavLink;
  transparentStyle?: boolean;
};
