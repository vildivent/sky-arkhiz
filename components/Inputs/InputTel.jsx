const InputTel = ({ onChange, className, value }) => {
  return (
    <input
      type="tel"
      name="phoneNumber"
      inputMode="tel"
      required
      placeholder="+_ ___ ___ __ __"
      onChange={(e) => {
        const str = e.target.value.match(/[0-9]/g)?.join("").substring(0, 11);
        e.target.value = str ? "+" + str : "";
        onChange(e);
      }}
      className={className}
      value={value}
    />
  );
};

export default InputTel;