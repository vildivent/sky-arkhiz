import DatePicker from "react-multi-date-picker";
import { AiOutlineClose } from "react-icons/ai";
import gregorian_ru from "../utils/calendar/locale/gregorian_ru";
import { ActionButton } from "./Buttons";

const CustomButton = ({ openCalendar, value, handleValueChange }) => {
  return (
    <ActionButton
      onClick={openCalendar}
      onChange={handleValueChange}
      className={`rounded-md py-2 px-4 text-sm ${value || "translate-x-3"}`}
    >
      {value || "Фильтр по дате"}
    </ActionButton>
  );
};

const DateFilter = ({ filterDate, setFilterDate }) => {
  return (
    <div className="flex justify-center mt-5 gap-2 z-[1]">
      <DatePicker
        value={filterDate}
        onChange={setFilterDate}
        locale={gregorian_ru}
        format="DD/MM/YYYY"
        render={<CustomButton />}
        weekStartDayIndex={1}
        className="bg-dark"
        editable={true}
        mobileLabels={{
          OK: "Выбрать",
          CANCEL: "Отмена",
        }}
      />

      <ActionButton
        className={`text-xl rounded-full ${
          filterDate ? "p-2" : "opacity-0 translate-x-10"
        }`}
        onClick={() => setFilterDate(null)}
      >
        <AiOutlineClose />
      </ActionButton>
    </div>
  );
};

export default DateFilter;
