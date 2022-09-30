import DatePicker, { DateObject } from "react-multi-date-picker";
import gregorian_ru from "../../utils/calendar/locale/gregorian_ru";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

const CustomInput = ({ openCalendar, value, handleValueChange, className }) => {
  return (
    <input
      className={className}
      placeholder="дд/мм/гггг ~ дд/мм/гггг"
      required
      onFocus={openCalendar}
      value={value}
      onChange={handleValueChange}
    />
  );
};

const InputDate = ({ className, dateRange, setDateRange }) => {
  return (
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
  );
};

export default InputDate;
