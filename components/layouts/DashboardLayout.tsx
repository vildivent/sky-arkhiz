import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import useBackground from "../../utils/hooks/useBackground";
import { _title, _keywords, _description } from "../../constasnts";
import Navbar from "../Navbar";
import Background from "../Background";
import Sidebar from "../Sidebar";
import { dashboardLinks } from "../../constasnts";
import { gallery3 } from "../../public/assets/gallery";
import { mobileBg } from "../../public/assets";
import ScrollToTop from "react-scroll-to-top";
import { IoIosArrowUp } from "react-icons/io";

const DashboardLayout = ({
  children,
  title,
  keywords,
  description,
  h1Title,
  mainProps,
  h1Props,
}: DashboardLayoutProps) => {
  const [sidebarIsOpened, setSidebarIsOpened] = useState(false);
  const bg = useBackground(gallery3, mobileBg);
  const router = useRouter();

  const handleLogout = async () => {
    await axios.get("/api/auth/logout");
    router.push("/login");
  };
  const fullTitle = ` ${title || _title} | Администрирование`;
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="keywords" content={keywords || _keywords} />
        <meta name="description" content={description || _description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        setSidebarIsOpened={setSidebarIsOpened}
        navLinks={dashboardLinks}
      />
      <Sidebar
        sidebarIsOpened={sidebarIsOpened}
        setSidebarIsOpened={setSidebarIsOpened}
        navLinks={dashboardLinks}
        handleLogout={handleLogout}
      />
      <Background bg={bg}>
        <main
          className={`mx-auto mb-3 sm:p-5 p-5 w-full sm:w-[90%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%] bg-[#1e1e1e] bg-opacity-70 border-[1px] rounded-xl border-[#111111] ${mainProps}`}
        >
          <h1 className={`font-h1 text-center sm:text-5xl text-3xl ${h1Props}`}>
            {h1Title || title}
          </h1>
          {children}
        </main>
      </Background>
      <ScrollToTop
        style={{ backgroundColor: "#404040" }}
        component={
          <span className="flex justify-center items-center text-3xl">
            <IoIosArrowUp />
          </span>
        }
        smooth
      />
    </>
  );
};
export default DashboardLayout;

type DashboardLayoutProps = {
  children?: ReactNode;
  title?: string;
  keywords?: string;
  description?: string;
  h1Title?: string;
  mainProps?: string;
  h1Props?: string;
};
