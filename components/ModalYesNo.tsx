import type { Dispatch, ReactNode, SetStateAction } from "react";
import { ActionButton, CancelButton } from "./Buttons";
import Modal from "./Modal";

const ModalYesNo = ({
  children,
  isOpen,
  setIsOpen,
  yesClick,
  noCkick,
}: ModalYesNoProps) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex gap-5 flex-col justify-center items-center">
        {children}
        <div className="flex gap-5">
          <ActionButton
            onClick={yesClick}
            className="rounded-md py-2 px-8 text-sm w-32"
          >
            Да
          </ActionButton>
          <CancelButton
            className="rounded-md py-2 px-8 text-sm w-32"
            onClick={noCkick}
          >
            Нет
          </CancelButton>
        </div>
      </div>
    </Modal>
  );
};

export default ModalYesNo;

type ModalYesNoProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  yesClick: () => void;
  noCkick: () => void;
};
