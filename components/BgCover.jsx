import BackgroundImage from "./BackgroundImage";

const BgCover = ({ children, bg, height, fixed }) => {
  return (
    <div className={`w-full h-[${height}] relative`}>
      <div className={`opacity-30`}>
        <BackgroundImage src={bg} alt="background" fixed={fixed} />
      </div>

      <div className={`pt-[4rem] relative z-[1] bg-transparent`}>
        {children}
      </div>
    </div>
  );
};

export default BgCover;
