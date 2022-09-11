import Image from "next/image";
import { useEffect, useState } from "react";

const MenuButton = ({
  srcState,
  src1,
  src2,
  alt,
  width,
  height,
  onClick,
  className,
}) => {
  const [menuIconSrc, setMenuIconSrc] = useState(!srcState ? src1 : src2);
  useEffect(() => {
    setMenuIconSrc(!srcState ? src1 : src2);
  }, [srcState, src1, src2]);
  return (
    <button
      className={`cursor-pointer ${className}`}
      onPointerEnter={() => setMenuIconSrc(srcState ? src1 : src2)}
      onPointerLeave={() => setMenuIconSrc(!srcState ? src1 : src2)}
      onClick={onClick}
    >
      <Image
        src={menuIconSrc}
        alt={alt}
        width={width || 30}
        height={height || 30}
      />
    </button>
  );
};

export default MenuButton;
