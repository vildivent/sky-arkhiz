import Button from "./Button";

const ActionButton = (props) => {
  const bg = "bg-[#003256]";
  return (
    <Button
      style={`bg-sky-700 hover:bg-blue-900 disabled:bg-blue-900 text-white`}
      {...props}
    />
  );
};

export default ActionButton;
