import { useState, useEffect } from "react";
import { staticCamLinks } from "../../constasnts";
import Image from "next/image";
import Router from "next/router";
import { backArrowWhite, backArrowCyan500 } from "../../public/assets";

export const getStaticPaths = async () => {
  const paths = staticCamLinks.map((link) => ({ params: { pid: link.id } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.pid;
  const element = staticCamLinks.find((camLink) => camLink.id === id);
  return { props: { staticCamLink: element } };
};

const CameraPage = ({ staticCamLink }) => {
  const [link, setLink] = useState(staticCamLink.link);
  const [count, setCount] = useState(0);
  const [hovered, setHovered] = useState(false);

  //refresh timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((value) => value + 1);
      setLink(staticCamLink.link + "?" + count);
    }, 120000);

    return () => clearInterval(timer);
  }, [count, staticCamLink.link]);

  return (
    <div>
      <div className={`flex justify-center my-10`}>
        <Image
          src={hovered ? backArrowWhite : backArrowCyan500}
          alt="Back"
          className={`cursor-pointer`}
          width={60}
          height={60}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={() => Router.back()}
        />
        <h1
          className={`flex flex-col justify-center text-center font-h1 text-5xl ml-10`}
        >
          {staticCamLink.title}
        </h1>
      </div>

      <div className={`flex justify-center`}>
        <img src={link} alt={`${staticCamLink.title} камера`} />
      </div>
    </div>
  );
};

export default CameraPage;
