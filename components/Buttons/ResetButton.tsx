import Button, { ButtonProps } from "./Button";

const ResetButton = (props: ButtonProps) => {
  return (
    <Button style={`bg-zinc-600 hover:bg-zinc-700 text-white`} {...props} />
  );
};

export default ResetButton;
