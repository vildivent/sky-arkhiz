import React from "react";
import { ActionButton } from "./Buttons";

const StattusChangeSwitcher = ({
  hideOnStatusChange,
  setHideOnStatusChange,
}) => {
  return (
    <ActionButton onClick={() => setHideOnStatusChange((prev) => !prev)}>{`${
      hideOnStatusChange ? "Убирать из списка" : "Оставлять в списке"
    }`}</ActionButton>
  );
};

export default StattusChangeSwitcher;
