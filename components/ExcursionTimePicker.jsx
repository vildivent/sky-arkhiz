import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
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
      {value || "Выбрать дату"}
    </ActionButton>
  );
};

const ExcursionTimePicker = ({ filterDate, setFilterDate }) => {
  return (
    <div className="flex justify-center gap-2 z-[1]">
      <DatePicker
        value={filterDate}
        onChange={setFilterDate}
        locale={gregorian_ru}
        format="DD/MM/YYYY HH:mm"
        render={<CustomButton />}
        weekStartDayIndex={1}
        className="bg-dark"
        editable={true}
        calendarPosition={"top"}
        fixMainPosition={true}
        plugins={[
          <TimePicker key={"timePicker"} position="bottom" hideSeconds />,
        ]}
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

export default ExcursionTimePicker;
