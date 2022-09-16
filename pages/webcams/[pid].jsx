/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Image from "next/image";
import Router from "next/router";

import { staticCamLinks } from "../../constasnts";
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
    <main>
      <div className={`flex justify-center my-3`}>
        <Image
          src={hovered ? backArrowWhite : backArrowCyan500}
          alt="Back"
          className={`cursor-pointer`}
          width={50}
          height={50}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={() => Router.back()}
        />
        <h1
          className={`flex flex-col justify-center text-center font-h1 text-3xl md:text-5xl lg:text-7xl sm:ml-10 ml-3`}
        >
          {staticCamLink.title}
        </h1>
      </div>

      <div className={`flex justify-center`}>
        <img
          className="w-full h-full"
          src={link}
          alt={`${staticCamLink.title} камера`}
        />
      </div>
    </main>
  );
};

export default CameraPage;
