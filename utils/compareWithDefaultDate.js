import { DateObject } from "react-multi-date-picker";

export const compareWithDefaultDate = (date) => {
  if (
    new DateObject(date).format("DD/MM/YYYY HH:mm") ===
    new DateObject(new Date(0)).format("DD/MM/YYYY HH:mm")
  )
    return true;
  return false;
};
