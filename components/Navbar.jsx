import { navLinks } from "../constasnts";
import ActiveLink from "./ActiveLink";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex justify-around">
        {navLinks.map((link, index) => (
          <li
            key={link.id}
            className={`${index === navLinks.length - 1 ? "mr-0" : "mr-2"}`}
          >
            <ActiveLink href={link.id}>{link.title}</ActiveLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
