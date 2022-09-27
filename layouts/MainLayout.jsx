import { useState } from "react";
import Head from "next/head";

import useBackground from "../hooks/useBackground";
import { _title, _keywords, _description } from "../constasnts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Background from "../components/Background";
import { gallery3 } from "../public/assets/gallery";
import { navLinks } from "../constasnts";
import { mobileBg } from "../public/assets";

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
  const bg = useBackground(gallery3, mobileBg);
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
      <Background bg={bg} opacity="opacity-50">
        <main
          className={`mx-auto mb-3 sm:p-5 p-5 w-full sm:w-[90%] lg:w-[80%] bg-[#1e1e1e] bg-opacity-70 border-[1px] rounded-xl border-[#111111] ${mainProps}`}
        >
          <h1 className={`font-h1 text-center sm:text-6xl text-4xl ${h1Props}`}>
            {h1Title || title}
          </h1>
          {children}
        </main>
        <Footer />
      </Background>
    </>
  );
}
