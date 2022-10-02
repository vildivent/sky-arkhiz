import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, isOpen, setIsOpen }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = (
    <div
      className={`${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-all duration-200 fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#1e1e1e] bg-opacity-50 z-[1000] flex justify-center items-center`}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={`${
          isOpen ? "scale-100" : "scale-75"
        } transition-all duration-200 p-10 min-w-[50vw] bg-[#1e1e1e] border border-cyan-500 rounded-md`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
