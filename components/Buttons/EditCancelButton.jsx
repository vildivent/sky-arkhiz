const EditCancelButton = ({ isEdit, onClick }) => {
  return (
    <>
      {isEdit && (
        <span
          className="text-cyan-500 hover:text-white cursor-pointer"
          onClick={onClick}
        >
          {"Отменить"}
        </span>
      )}
    </>
  );
};

export default EditCancelButton;
