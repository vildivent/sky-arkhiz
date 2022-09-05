import { useState, useEffect } from "react";
import { staticCamLinks } from "../../constasnts";

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

  //refresh timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((value) => value + 1);
      setLink(staticCamLink.link + "?" + count);
    }, 60000);

    return () => clearInterval(timer);
  }, [count, staticCamLink.link]);

  return (
    <div>
      <h1 className={`text-center font-h1 text-5xl`}>{staticCamLink.title}</h1>
      <div className={`flex justify-center`}>
        <img src={link} alt={`${staticCamLink.title} камера`} />
      </div>
    </div>
  );
};

export default CameraPage;
