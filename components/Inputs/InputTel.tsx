import type { ChangeEventHandler } from "react";

const InputTel = ({ onChange, className, value }: InputTelProps) => {
  return (
    <input
      type="tel"
      name="phoneNumber"
      inputMode="tel"
      required
      onChange={(e) => {
        const str =
          e.target.value.match(/[0-9]/g)?.join("").substring(0, 11) || "";
        e.target.value = str
          ? `${str.length > 0 ? "+" : ""}${str[0] || ""}${
              str.length > 1 ? " (" : ""
            }${str[1] || ""}${str[2] || ""}${str[3] || ""}${
              str.length > 4 ? ") " : ""
            }${str[4] || ""}${str[5] || ""}${str[6] || ""}${
              str.length > 7 ? "-" : ""
            }${str[7] || ""}${str[8] || ""}${str.length > 9 ? "-" : ""}${
              str[9] || ""
            }${str[10] || ""}`
          : "";
        onChange(e);
      }}
      className={className}
      value={value}
    />
  );
};

export default InputTel;

type InputTelProps = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  value: string | number;
};
