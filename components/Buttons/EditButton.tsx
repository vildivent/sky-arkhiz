import type { MouseEventHandler } from "react";

const EditButton = ({
  isEdit = false,
  isDefault = false,
  onClick,
}: EditButtonProps) => {
  return (
    <button
      className="text-cyan-500 hover:text-white cursor-pointer"
      onClick={onClick}
    >
      {isEdit ? "Сохранить" : `${isDefault ? "Добавить" : "Изменить"}`}
    </button>
  );
};

export default EditButton;

type EditButtonProps = {
  isEdit?: boolean;
  isDefault?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};
