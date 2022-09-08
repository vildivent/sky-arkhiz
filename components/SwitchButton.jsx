export const SwitchButton = ({ title, state, setState, isLiveButton }) => {
  return (
    <button
      className={`w-32 h-10 ${
        state === isLiveButton ? "text-white bg-[#111111] bg-opacity-70" : ""
      } hover:bg-[#181818] hover:bg-opacity-70 hover:text-white`}
      onClick={() => (isLiveButton ? setState(true) : setState(false))}
    >
      {title}
    </button>
  );
};
