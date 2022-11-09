import type { MouseEventHandler, ReactNode } from "react";

const Button = ({
  children,
  className,
  title,
  style,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center transition-all duration-[250ms] ${style} ${
        className || "rounded-md py-2 px-4 text-sm"
      }`}
      onClick={onClick}
      {...props}
    >
      {title || children}
    </button>
  );
};

export default Button;

export type ButtonProps = {
  children?: ReactNode;
  className?: string;
  title?: string;
  style?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
