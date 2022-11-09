import Button, { ButtonProps } from "./Button";

const CancelButton = (props: ButtonProps) => {
  return <Button style={`bg-red-800 hover:bg-red-900 text-white`} {...props} />;
};

export default CancelButton;
