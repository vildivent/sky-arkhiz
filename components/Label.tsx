import type { ReactNode } from "react";

const Label = ({ children, wrongFormat, htmlFor }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-bold ${wrongFormat ? "text-red-400" : ""}`}
    >
      {children}
    </label>
  );
};

export default Label;

type LabelProps = {
  children?: ReactNode;
  wrongFormat?: boolean;
  htmlFor?: string;
};
