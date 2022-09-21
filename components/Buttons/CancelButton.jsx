import Button from "./Button";

const CancelButton = ({ className, ...props }) => {
  return (
    <Button
      className={`bg-red-800 hover:bg-red-900 text-white ${className}`}
      {...props}
    />
  );
};

export default CancelButton;
