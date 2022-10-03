const Button = ({ className, title, style, ...props }) => {
  return (
    <button
      className={`flex justify-center items-center transition-all duration-[250ms] ${style} ${
        className || "rounded-md py-2 px-4 text-sm"
      }`}
      {...props}
    >
      {title || props.children}
    </button>
  );
};

export default Button;
