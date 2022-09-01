import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { _title, _keywords, _description } from "../constasnts";

export function MainLayout({ children, title, keywords, description }) {
  // const router = useRouter();

  // const FindTitle = (navLinks) =>
  //   navLinks.find(
  //     (link) => (link.id === "/" ? "/" : `/${link.id}`) === router.asPath
  //   );
  // const title = FindTitle(navLinks).title;

  return (
    <>
      <Head>
        <title>{title || _title} | Ночные экскурсии Архыз</title>
        <meta name="keywords" content={keywords || _keywords} />
        <meta name="description" content={description || _description} />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Navbar />
      {children}

      <Footer />
    </>
  );
}
