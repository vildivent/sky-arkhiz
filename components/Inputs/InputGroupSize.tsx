import type {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
} from "react";

const InputGroupSize = ({
  onChange,
  className,
  value,
  onBlur,
  onClick,
}: InputGroupSizeProps) => {
  return (
    <input
      type="text"
      name="groupSize"
      onChange={(e) => {
        e.target.value =
          e.target.value.match(/[0-9]/g)?.join("").substring(0, 2) || "";
        onChange(e);
      }}
      className={className}
      value={value}
      onBlur={onBlur}
      onClick={onClick}
      autoComplete="off"
    />
  );
};

export default InputGroupSize;

type InputGroupSizeProps = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  value: number | string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
};
