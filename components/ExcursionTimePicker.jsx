import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { AiOutlineClose } from "react-icons/ai";
import gregorian_ru from "../utils/calendar/locale/gregorian_ru";
import { ActionButton } from "./Buttons";

const CustomButton = ({
  openCalendar,
  value,
  handleValueChange,
  filterDate,
  setFilterDate,
}) => {
  const defaultDate = new DateObject();
  defaultDate.hour = 20;
  defaultDate.minute = 0;

  return (
    <ActionButton
      onClick={() => {
        openCalendar();
        if (!filterDate) setFilterDate(defaultDate);
      }}
      onChange={handleValueChange}
      className={`rounded-md py-2 px-4 text-sm ${value || "translate-x-3"}`}
    >
      {value || "Выбрать дату"}
    </ActionButton>
  );
};

const ExcursionTimePicker = ({ filterDate, setFilterDate, dateRange }) => {
  const startDay = new DateObject({ date: dateRange[0], format: "DD/MM/YYYY" });
  const endDay = new DateObject({ date: dateRange[1], format: "DD/MM/YYYY" });
  endDay.add(1, "day");

  return (
    <div className="flex justify-center gap-2 z-[1]">
      <DatePicker
        value={filterDate}
        onChange={setFilterDate}
        locale={gregorian_ru}
        format="DD/MM/YYYY HH:mm"
        render={
          <CustomButton filterDate={filterDate} setFilterDate={setFilterDate} />
        }
        weekStartDayIndex={1}
        className="bg-dark scale-[1.40] sm:translate-y-[-5.5rem] translate-y-[-5rem]"
        editable={true}
        calendarPosition={"top"}
        fixMainPosition={true}
        arrow={false}
        plugins={[
          <TimePicker key={"timePicker"} position="bottom" hideSeconds />,
        ]}
        mapDays={({ date }) => {
          if (startDay < date && endDay > date) {
            return {
              className: "excursion-time-picker__calendar-highlight",
            };
          }
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

export default ExcursionTimePicker;
