import Link from "next/link";
import { useRouter } from "next/router";

export default function ActiveLink({ children, href }) {
  const router = useRouter();
  const activeLinkStyle = "border-b border-black";

  return (
    <>
      <Link href={href}>
        <a
          className={
            router.asPath === (href === "/" ? "/" : `/${href}`)
              ? activeLinkStyle
              : undefined
          }
        >
          {children}
        </a>
      </Link>
    </>
  );
}
