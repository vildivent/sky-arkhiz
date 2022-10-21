import Link from "next/link";
import { useRouter } from "next/router";

export default function ActiveLink({ children, href, changedNavbar, sidebar }) {
  const router = useRouter();

  return (
    <Link href={href === "/" ? "/" : `/${href}`} prefetch={false}>
      <a className={`flex`}>
        <span
          className={`${sidebar ? "py-2" : "p-3"} ${
            router.pathname === (href === "/" ? "/" : `/${href}`)
              ? changedNavbar
                ? "text-white"
                : "text-cyan-500"
              : undefined
          }`}
        >
          {children}
        </span>
      </a>
    </Link>
  );
}
