import { useRouter } from "next/router";

import Navbar from "./Navbar";
import BackgroundImage from "./BackgroundImage";
import { navLinks } from "../constasnts";
import bg from "../public/assets/bg.png";

export function MainLayout({ children }) {
  const router = useRouter();

  // const FindTitle = (navLinks) =>
  //   navLinks.find(
  //     (link) => (link.id === "/" ? "/" : `/${link.id}`) === router.asPath
  //   );
  // const title = FindTitle(navLinks).title;

  return (
    <>
      <Navbar />
      <BackgroundImage src={bg} alt="background" />
      <div className="mt-16">{children}</div>
    </>
  );
}
