import { useState } from "react";
import Head from "next/head";
import { _title, _keywords, _description } from "../../constasnts";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import { navLinks } from "../../constasnts";
import ScrollToTop from "react-scroll-to-top";
import { IoIosArrowUp } from "react-icons/io";

const imgUrl =
  "https://skyarhyz.ru/_next/static/media/telescope-logo.08147157.png";

const HomePageLayout = ({
  children,
  title,
  keywords,
  description,
}: HomePageLayoutProps) => {
  const [sidebarIsOpened, setSidebarIsOpened] = useState(false);
  const fullTitle = `${title || _title} | Ночные экскурсии Архыз`;
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="keywords" content={keywords || _keywords} />
        <meta name="description" content={description || _description} />
        <meta name="image" content={imgUrl} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Ночные экскурсии по звёздному небу Архыз"
        />
        <meta property="og:description" content={description || _description} />
        <meta property="og:image" itemProp="image" content={imgUrl} />
      </Head>

      <Navbar setSidebarIsOpened={setSidebarIsOpened} navLinks={navLinks} />

      <Sidebar
        sidebarIsOpened={sidebarIsOpened}
        setSidebarIsOpened={setSidebarIsOpened}
        navLinks={navLinks}
      />

      {children}

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
    </>
  );
};

export default HomePageLayout;

type HomePageLayoutProps = {
  children?: JSX.Element;
  title?: string;
  keywords?: string;
  description?: string;
};
