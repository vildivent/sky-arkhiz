const Button = ({ className, ...props }) => {
  return (
    <button
      className={`flex justify-center items-center rounded-sm py-2 px-4 text-xs ${className}`}
      {...props}
    >
      {props.title}
    </button>
  );
};

export default Button;
