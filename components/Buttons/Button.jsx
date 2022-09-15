const Button = (props) => {
  return (
    <button
      {...props}
      className={`flex justify-center items-center rounded-sm py-2 px-4 text-xs ${
        props.className ? props.className : ""
      }`}
    >
      {props.title}
    </button>
  );
};

export default Button;
