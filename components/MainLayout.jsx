import { useState } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { _title, _keywords, _description } from "../constasnts";
import Sidebar from "./Sidebar";

export function MainLayout({ children, title, keywords, description }) {
  // const router = useRouter();

  // const FindTitle = (navLinks) =>
  //   navLinks.find(
  //     (link) => (link.id === "/" ? "/" : `/${link.id}`) === router.asPath
  //   );
  // const title = FindTitle(navLinks).title;

  const [sidebarIsOpened, setSidebarIsOpened] = useState(false);

  return (
    <>
      <Head>
        <title>{title || _title} | Ночные экскурсии Архыз</title>
        <meta name="keywords" content={keywords || _keywords} />
        <meta name="description" content={description || _description} />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Navbar setSidebarIsOpened={setSidebarIsOpened} />
      <Sidebar
        sidebarIsOpened={sidebarIsOpened}
        setSidebarIsOpened={setSidebarIsOpened}
      />
      {children}

      <Footer />
    </>
  );
}
