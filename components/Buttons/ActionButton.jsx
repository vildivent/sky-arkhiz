import Button from "./Button";

const ActionButton = ({ className, ...props }) => {
  return (
    <Button
      className={`bg-[#003256] hover:bg-[#00243F] text-white ${className}`}
      {...props}
    />
  );
};

export default ActionButton;
