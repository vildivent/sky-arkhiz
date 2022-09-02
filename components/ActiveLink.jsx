import Link from "next/link";
import { useRouter } from "next/router";

export default function ActiveLink({ children, href, changedNavbar, sidebar }) {
  const router = useRouter();

  return (
    <Link href={href === "/" ? "/" : `/${href}`} prefetch={false}>
      <a>
        <div
          className={` ${
            sidebar
              ? "text-start hover:text-white"
              : "pb-5 px-5 text-center hover:border-b-2"
          } ${
            changedNavbar
              ? "hover:border-cyan-500 text-cyan-500"
              : "hover:border-white"
          } ${
            router.asPath === (href === "/" ? "/" : `/${href}`)
              ? `border-b-2 ${
                  changedNavbar ? "border-cyan-500" : "border-white"
                }`
              : undefined
          }`}
        >
          {children}
        </div>
      </a>
    </Link>
  );
}
