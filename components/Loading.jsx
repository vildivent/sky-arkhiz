import Image from "next/image";
import { loadingGif } from "../public/assets";

const Loading = ({ array, loading, alt }) => {
  return (
    <>
      {!(array.length > 0) && (
        <>
          {loading ? (
            <Image src={loadingGif} alt="loading" width={40} height={40} />
          ) : (
            <span>{alt}</span>
          )}
        </>
      )}
    </>
  );
};

export default Loading;
