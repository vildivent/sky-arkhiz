import BackgroundImage from "./BackgroundImage";

const BgCover = ({ children, bg, height }) => {
  return (
    <div className={`w-full h-[${height}] relative`}>
      <div className={` opacity-30`}>
        <BackgroundImage src={bg} alt="background" />
      </div>

      <div className={`pt-[125px] relative z-[1] bg-transparent`}>
        {children}
      </div>
    </div>
  );
};

export default BgCover;
