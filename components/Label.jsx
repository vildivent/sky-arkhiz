const Label = ({ children, wrongFormat }) => {
  return (
    <label
      className={`text-xs text-white opacity-70 ${
        wrongFormat ? "text-red-400" : ""
      }`}
    >
      {children}
    </label>
  );
};

export default Label;
