import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const ActiveLink = ({
  children,
  href,
  transparentStyle = false,
  sidebar = false,
}: ActiveLinkProps) => {
  const { pathname } = useRouter();

  return (
    <Link href={href === "/" ? "/" : `/${href}`}>
      <a className="flex">
        <span
          className={`${sidebar ? "py-2" : "p-3"} ${
            pathname === (href === "/" ? "/" : `/${href}`)
              ? transparentStyle
                ? "text-cyan-500"
                : "text-white"
              : ""
          }`}
        >
          {children}
        </span>
      </a>
    </Link>
  );
};

export default ActiveLink;

type ActiveLinkProps = {
  children?: ReactNode;
  href: string;
  transparentStyle?: boolean;
  sidebar?: boolean;
};
