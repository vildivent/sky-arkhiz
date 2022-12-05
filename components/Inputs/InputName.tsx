import type { ChangeEventHandler } from "react";

const InputName = ({ className, onChange, value }: InputNameProps) => {
  return (
    <input
      type="text"
      name="name"
      minLength={2}
      maxLength={20}
      placeholder="Ваше имя"
      onChange={(e) => {
        onChange(e);
      }}
      className={className}
      value={value}
    />
  );
};

export default InputName;

type InputNameProps = {
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value: string;
  id?: string;
};
