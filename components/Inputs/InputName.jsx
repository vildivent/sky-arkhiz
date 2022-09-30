const InputName = ({ className, onChange, value }) => {
  return (
    <input
      type="text"
      name="name"
      minLength="2"
      maxLength="20"
      placeholder="Ваше имя"
      required
      onChange={(e) => {
        onChange(e);
      }}
      className={className}
      value={value}
    />
  );
};

export default InputName;
