import Button from "./Button";

const CancelButton = (props) => {
  return (
    <Button {...props} className={`bg-red-800 hover:bg-red-900 text-white`} />
  );
};

export default CancelButton;
