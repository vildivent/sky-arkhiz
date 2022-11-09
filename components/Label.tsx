import type { ReactNode } from "react";

const Label = ({ children, wrongFormat }: LabelProps) => {
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

type LabelProps = {
  children?: ReactNode;
  wrongFormat?: boolean;
};
