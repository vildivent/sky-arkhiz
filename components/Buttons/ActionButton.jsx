import Button from "./Button";

const ActionButton = ({ className, ...props }) => {
  return (
    <Button
      className={`bg-zinc-600 hover:bg-zinc-700 text-white ${className}`}
      {...props}
    />
  );
};

export default ActionButton;
