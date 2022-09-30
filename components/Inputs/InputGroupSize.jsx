const InputGroupSize = ({ onChange, className, value }) => {
  return (
    <input
      type="number"
      max={99}
      min={1}
      name="groupSize"
      onChange={(e) => {
        e.target.value = e.target.value.substring(0, 2);
        onChange(e);
      }}
      className={className}
      value={value}
    />
  );
};

export default InputGroupSize;
