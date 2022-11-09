import { MouseEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { MainLayout } from "../../components/layouts/MainLayout";
import {
  ActionButton,
  ResetButton,
  CancelButton,
} from "../../components/Buttons";
import {
  InputName,
  InputTel,
  InputGroupSize,
  InputDate,
} from "../../components/Inputs";
import Label from "../../components/Label";
import type { DateObject } from "react-multi-date-picker";

const Request = () => {
  const router = useRouter();
  const initialDates: DateObject[] = [null, null];
  const initialState = {
    name: "",
    phoneNumber: "",
    groupSize: 1,
    comment: "",
  };
  const inputStyle =
    "text-black bg-gray-200 border py-1 px-2 mb-2 text-xs outline-none placeholder:text-gray-700 rounded-sm";
  const [data, setData] = useState(initialState);
  const [dateRange, setDateRange] = useState(initialDates);
  const [wrongFormat, setWrongFormat] = useState(false);

  const submitHandler = async () => {
    if (
      data.name &&
      data.phoneNumber.length === 12 &&
      data.groupSize > 0 &&
      dateRange[0] &&
      dateRange[1]
    ) {
      try {
        console.log("Отправка...");
        await axios.post("/api/requests/addNew", {
          data: {
            ...data,
            groupSize: data.groupSize,
            dates: dateRange.map((date) => date.format()),
          },
        });
        console.log("Заявка оставлена");

        router.push("/request/success");
      } catch (error) {
        console.log(error);
      }
    } else setWrongFormat(true);
  };

  useEffect(() => {
    if (
      data.name &&
      data.phoneNumber.length === 12 &&
      dateRange[0] &&
      dateRange[1]
    )
      setWrongFormat(false);
  }, [data, dateRange]);

  const resetHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    setData(initialState);
    setDateRange(initialDates);
    setWrongFormat(false);
  };

  const cancelHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <MainLayout title={"Оставить заявку"}>
      <main className={`mx-auto`}>
        <form
          className={`sm:w-1/2 flex flex-col gap-1 mx-auto py-10`}
          onSubmit={(e) => e.preventDefault()}
        >
          {/*имя пользователя*/}
          <Label wrongFormat={wrongFormat && !data.name}>* Ваше имя:</Label>
          <InputName
            value={data.name}
            className={inputStyle}
            onChange={(e) =>
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          {/*телефон*/}
          <Label wrongFormat={wrongFormat && data.phoneNumber.length !== 12}>
            * Ваш контактный телефон:
          </Label>
          <InputTel
            value={data.phoneNumber}
            className={inputStyle}
            onChange={(e) =>
              setData((prev) => ({ ...prev, phoneNumber: e.target.value }))
            }
          />

          {/*Размер группы*/}
          <Label wrongFormat={wrongFormat && !(data.groupSize > 0)}>
            * Размер группы (чел.):
          </Label>
          <InputGroupSize
            value={data.groupSize}
            className={inputStyle}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                groupSize: e.target.valueAsNumber,
              }))
            }
          />

          {/*Даты*/}
          <Label wrongFormat={wrongFormat && (!dateRange[0] || !dateRange[1])}>
            * Диапазон дат, в который Вам бы хотелось посетить экскурсию:
          </Label>
          <InputDate
            className={inputStyle}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />

          {/*Комментарий-описание*/}
          <Label>Комментарий:</Label>
          <textarea
            name="text"
            placeholder="Комментарий"
            value={data.comment}
            onChange={(e) => {
              setData((prev) => ({ ...prev, comment: e.target.value }));
            }}
            className={`${inputStyle.replace(
              /( mb-2)/,
              ""
            )} resize-none h-40 mb-0`}
          />

          <div
            className={`mt-2 ${
              wrongFormat ? "text-red-500" : "text-gray-300"
            } font-p italic text-sm `}
          >
            *отмечены поля, обязательные к заполнению
          </div>

          <div className="grid grid-cols-2 gap-2 flex-wrap items-center justify-center mt-4">
            <ActionButton onClick={submitHandler}>Подтвердить</ActionButton>
            <ResetButton onClick={resetHandler}>Сбросить поля</ResetButton>
            <CancelButton onClick={cancelHandler}>Отменить</CancelButton>
          </div>
        </form>
      </main>
    </MainLayout>
  );
};
export default Request;
