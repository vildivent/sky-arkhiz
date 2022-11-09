import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import gregorian_ru from "../../utils/calendar/locale/gregorian_ru";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import type {
  ChangeEventHandler,
  Dispatch,
  FocusEventHandler,
  SetStateAction,
} from "react";

const CustomInput = ({
  openCalendar,
  value,
  handleValueChange,
  className,
}: CustomInputProps) => {
  return (
    <input
      className={`${className} cursor-pointer`}
      placeholder="дд/мм/гггг ~ дд/мм/гггг"
      required
      onFocus={openCalendar}
      value={value}
      onChange={handleValueChange}
      readOnly={true}
    />
  );
};

const InputDate = ({
  className,
  dateRange,
  setDateRange,
  editable = true,
}: InputDateProps) => {
  return editable ? (
    <DatePicker
      value={dateRange}
      onChange={setDateRange}
      range
      locale={gregorian_ru}
      format="DD/MM/YYYY"
      render={<CustomInput className={className} />}
      weekStartDayIndex={1}
      minDate={new DateObject()}
      maxDate={new DateObject().add(3, "month")}
      className="bg-dark"
      inputClass="custom-input"
    />
  ) : (
    <Calendar
      value={dateRange}
      range
      locale={gregorian_ru}
      format="DD/MM/YYYY"
      weekStartDayIndex={1}
      className="bg-dark"
      readOnly
    />
  );
};

export default InputDate;

type InputDateProps = {
  className?: string;
  dateRange: Date[] | string[] | number[] | DateObject[];
  setDateRange: Dispatch<SetStateAction<DateObject | DateObject[]>>;
  editable?: boolean;
};

type CustomInputProps = {
  openCalendar?: FocusEventHandler<HTMLInputElement>;
  value?: string | number;
  handleValueChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
};
