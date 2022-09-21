import Button from "./Button";

const ResetButton = ({ className, ...props }) => {
  return (
    <Button
      className={`bg-zinc-600 hover:bg-zinc-700 border-2 border-red-800 text-white ${className}`}
      {...props}
    />
  );
};

export default ResetButton;
