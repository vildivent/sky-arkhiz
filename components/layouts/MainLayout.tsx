import { ReactNode, useState } from "react";
import Head from "next/head";

import useBackground from "../../utils/hooks/useBackground";
import { _title, _keywords, _description } from "../../constasnts";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import Background from "../Background";
import { gallery19 } from "../../public/assets/gallery";
import { navLinks } from "../../constasnts";
import { mobileBg } from "../../public/assets";
import ScrollToTop from "react-scroll-to-top";
import { IoIosArrowUp } from "react-icons/io";

export function MainLayout({
  children,
  title,
  keywords,
  description,
  h1Title,
  mainProps,
  h1Props,
}: MainLayoutProps) {
  const [sidebarIsOpened, setSidebarIsOpened] = useState(false);
  const bg = useBackground(gallery19, mobileBg);
  const fullTitle = `${title || _title} | Ночные экскурсии Архыз`;
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="keywords" content={keywords || _keywords} />
        <meta name="description" content={description || _description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar setSidebarIsOpened={setSidebarIsOpened} navLinks={navLinks} />
      <Sidebar
        sidebarIsOpened={sidebarIsOpened}
        setSidebarIsOpened={setSidebarIsOpened}
        navLinks={navLinks}
      />
      <Background bg={bg} opacity="opacity-50">
        <main
          className={`mx-auto mb-3 sm:p-5 p-5 w-full sm:w-[90%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%] bg-[#1e1e1e] bg-opacity-70 border-[1px] rounded-xl border-[#111111] ${mainProps}`}
        >
          <h1 className={`font-h1 text-center sm:text-6xl text-4xl ${h1Props}`}>
            {h1Title || title}
          </h1>
          {children}
        </main>
        <Footer />
        <ScrollToTop
          style={{ backgroundColor: "#404040" }}
          component={
            <span className="flex justify-center items-center text-3xl">
              <IoIosArrowUp />
            </span>
          }
          smooth
        />
      </Background>
    </>
  );
}
type MainLayoutProps = {
  children?: ReactNode;
  title?: string;
  keywords?: string;
  description?: string;
  h1Title?: string;
  mainProps?: string;
  h1Props?: string;
};
