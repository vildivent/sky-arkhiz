import Link from "next/link";
import { useRouter } from "next/router";
import NavbarDropdown from "./NavbarDropdown";

export default function ActiveLink({ children, href, changedNavbar }) {
  const router = useRouter();

  return (
    <Link href={href}>
      <a>
        {/* <NavbarDropdown> */}
        <div
          className={`pb-5 px-5 text-center hover:border-b ${
            changedNavbar ? "hover:border-cyan-500" : "hover:border-white"
          } ${
            router.asPath === (href === "/" ? "/" : `/${href}`)
              ? `border-b ${changedNavbar ? "border-cyan-500" : "border-white"}`
              : undefined
          }`}
        >
          {children}
        </div>
        {/* </NavbarDropdown> */}
      </a>
    </Link>
  );
}
