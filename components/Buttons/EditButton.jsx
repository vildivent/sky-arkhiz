const EditButton = ({ isEdit = false, isDefault = false, onClick }) => {
  return (
    <span
      className="text-cyan-500 hover:text-white cursor-pointer"
      onClick={onClick}
    >
      {isEdit ? "Сохранить" : `${isDefault ? "Добавить" : "Изменить"}`}
    </span>
  );
};

export default EditButton;
