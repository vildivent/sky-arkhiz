const Button = ({ className, title, style, ...props }) => {
  return (
    <button
      className={`flex justify-center items-center ${style} ${
        className || "rounded-sm py-2 px-4 text-xs"
      }`}
      {...props}
    >
      {title || props.children}
    </button>
  );
};

export default Button;
