import React from "react";
import { ActionButton } from "./Buttons";

const StattusChangeSwitcher = ({
  hideOnStatusChange,
  setHideOnStatusChange,
}) => {
  return (
    <div className="flex justify-center">
      <ActionButton onClick={() => setHideOnStatusChange((prev) => !prev)}>{`${
        hideOnStatusChange ? "Убирать из списка" : "Оставлять в списке"
      }`}</ActionButton>
    </div>
  );
};

export default StattusChangeSwitcher;
