import { IoClose } from "react-icons/io5";
const SidebarCloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="cursor-pointer pt-7 px-7 pb-4 text-cyan-500 hover:text-white text-4xl"
      onClick={onClick}
    >
      <IoClose />
    </button>
  );
};

export default SidebarCloseButton;
