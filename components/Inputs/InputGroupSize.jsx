const InputGroupSize = ({ onChange, className, value, onBlur, onClick }) => {
  return (
    <input
      type="text"
      name="groupSize"
      onChange={(e) => {
        e.target.value =
          e.target.value.match(/[0-9]/g)?.join("").substring(0, 2) || "";
        onChange(e);
      }}
      className={className}
      value={value}
      onBlur={onBlur}
      onClick={onClick}
      autoComplete="off"
    />
  );
};

export default InputGroupSize;
