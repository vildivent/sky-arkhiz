import { useState } from "react";
import Head from "next/head";

import { _title, _keywords, _description } from "../constasnts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { navLinks } from "../constasnts";

export function HomePageLayout({ children, title, keywords, description }) {
  const [sidebarIsOpened, setSidebarIsOpened] = useState(false);
  const fullTitle = `${title || _title} | Ночные экскурсии Архыз`;
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="keywords" content={keywords || _keywords} />
        <meta name="description" content={description || _description} />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Navbar setSidebarIsOpened={setSidebarIsOpened} navLinks={navLinks} />
      <Sidebar
        sidebarIsOpened={sidebarIsOpened}
        setSidebarIsOpened={setSidebarIsOpened}
        navLinks={navLinks}
      />
      {children}
      <Footer />
    </>
  );
}
