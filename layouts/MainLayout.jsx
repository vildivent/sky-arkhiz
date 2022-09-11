import { useState } from "react";
import Head from "next/head";

import useBackground from "../hooks/useBackground";
import { _title, _keywords, _description } from "../constasnts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import BgCover from "../components/BgCover";
import { bgStars4k } from "../public/assets";

export function MainLayout({
  children,
  title,
  keywords,
  description,
  h1Title,
  mainProps,
  h1Props,
}) {
  const [sidebarIsOpened, setSidebarIsOpened] = useState(false);
  const [bg, fixed] = useBackground(bgStars4k);

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
      <BgCover bg={bg} fixed={fixed} height="100%">
        <main
          className={`mx-auto mb-3 p-5 w-[90%] lg:w-[80%] bg-[#1e1e1e] bg-opacity-70 border-[1px] rounded-xl border-[#111111] ${mainProps}`}
        >
          <h1 className={`font-h1 text-center sm:text-7xl text-4xl ${h1Props}`}>
            {h1Title || title}
          </h1>
          {children}
        </main>
        <Footer />
      </BgCover>
    </>
  );
}
