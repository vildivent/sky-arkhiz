import Button from "./Button";

const ResetButton = (props) => {
  return (
    <Button style={`bg-zinc-600 hover:bg-zinc-700 text-white`} {...props} />
  );
};

export default ResetButton;
