import Button from "./Button";

const ResetButton = (props) => {
  return (
    <Button
      {...props}
      className={`bg-zinc-600 hover:bg-zinc-700 border-2 border-red-800 text-white`}
    />
  );
};

export default ResetButton;
