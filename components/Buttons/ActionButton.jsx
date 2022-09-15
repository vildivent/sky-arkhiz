import Button from "./Button";

const ActionButton = (props) => {
  return (
    <Button {...props} className={`bg-zinc-600 hover:bg-zinc-700 text-white`} />
  );
};

export default ActionButton;
