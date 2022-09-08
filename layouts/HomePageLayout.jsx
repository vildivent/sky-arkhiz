import { useState } from "react";
import Head from "next/head";

import { _title, _keywords, _description } from "../constasnts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export function HomePageLayout({ children, title, keywords, description }) {
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
