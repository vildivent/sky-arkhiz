const Button = ({
  className = "rounded-sm py-2 px-4 text-xs",
  title,
  ...props
}) => {
  return (
    <button
      className={`flex justify-center items-center ${className}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
