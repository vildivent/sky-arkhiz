import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { useBrowser } from "../utils/hooks/useBrowser";

const Modal = ({ children, isOpen, setIsOpen, padding = true }: ModalProps) => {
  const { isBrowser } = useBrowser();
  const modalContent = (
    <div
      className={`${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-200 fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#1e1e1e] bg-opacity-50 z-[1000] flex justify-center items-center`}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={`${isOpen ? "scale-100" : "scale-75"} ${
          padding ? "p-10" : "p-0"
        } transition-all duration-200 bg-[#1e1e1e] border border-gray-500 shadow-md shadow-gray-700 rounded-md`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  if (isBrowser) {
    return createPortal(modalContent, document.getElementById("modal-root"));
  } else {
    return null;
  }
};

export default Modal;

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  padding?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
