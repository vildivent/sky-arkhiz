import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRequest,
  setRequestData,
} from "../redux/features/request/requestSlice";
import { CancelButton } from "./Buttons";
import { InputDate } from "./Inputs";
import ModalYesNo from "./ModalYesNo";
import FilterMenu from "./FilterMenu";
import { requestStatusTypes } from "../constasnts";
import { DateObject } from "react-multi-date-picker";
import { setRequestsEdit } from "../redux/features/requestEdit/requestEditSlice";
import ExcursionTimePicker from "./ExcursionTimePicker";
import { compareWithDefaultDate } from "../utils/compareWithDefaultDate";

const RequestItem = ({ request }) => {
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.requestEdit);

  const [description, setDescription] = useState(request.description);
  const [excursionDate, setExcursionDate] = useState(
    compareWithDefaultDate(request.excursionDate) ? null : request.excursionDate
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const deleteHandler = () => {
    try {
      setModalIsOpen(false);
      dispatch(deleteRequest({ id: request._id }));
      console.log("Заявка удалена!");
    } catch (error) {
      console.error(error);
    }
  };

  const setStatusHandler = (status) => {
    try {
      dispatch(setRequestData({ id: request._id, status }));
      dispatch(setRequestsEdit(["status"]));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2 border border-gray-600 rounded-lg w-full sm:w-2/3 relative z-0">
      <div className="absolute top-2 right-2">
        <CancelButton onClick={() => setModalIsOpen(true)}>
          Удалить заявку
        </CancelButton>

        <ModalYesNo
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          yesClick={deleteHandler}
          noCkick={() => setModalIsOpen(false)}
        >
          <h1 className="text-gray-300">
            Вы действительно хотите удалить эту заявку?
          </h1>
        </ModalYesNo>
      </div>

      <div>{`Имя: ${request.name}`}</div>

      <div className="">
        Телефон:
        <a
          href={`tel:${request.phoneNumber}`}
          className="ml-2 text-cyan-500 hover:text-white"
        >{`${request.phoneNumber}`}</a>
      </div>

      <div>{`Размер группы: ${request.groupSize} чел.`}</div>

      <div>{`Даты: ${request.dates[0]} ~ ${request.dates[1]}`}</div>
      <div className="flex justify-center relative z-0">
        <InputDate dateRange={request.dates} editable={false} />
      </div>

      <div>{`Комментарий: ${request.comment}`}</div>
      <div>{`Дата создания: ${new DateObject(request.createdAt).format(
        "DD/MM/YYYY HH:mm"
      )}`}</div>

      <div className="flex flex-wrap">
        {`Описание: ${request.description}`}
        <div
          className="text-cyan-500 hover:text-white ml-2 cursor-pointer"
          onClick={() => {
            if (edit.description)
              dispatch(
                setRequestData({
                  id: request._id,
                  description,
                })
              );
            dispatch(setRequestsEdit(["description"]));
          }}
        >
          {request.description
            ? `${edit.description ? "Сохранить" : "Изменить"}`
            : `${edit.description ? "Сохранить" : "Добавить"}`}
        </div>
        <textarea
          name="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full outline-none bg-[#1e1e1e] border-cyan-500 rounded-md resize-none transition-all delay-250 ${
            edit.description ? "h-40 py-1 px-2 border " : "h-0 "
          }`}
        />
      </div>

      <div className="flex flex-wrap">
        {`Статус: ${
          requestStatusTypes.find((item) => item.id === request.status)
            ?.title || "Ошибка"
        }`}
        <div
          className="text-cyan-500 hover:text-white ml-2 cursor-pointer"
          onClick={() => {
            dispatch(setRequestsEdit(["status"]));
          }}
        >
          Изменить
        </div>

        <FilterMenu
          className={`w-full flex flex-wrap gap-3 justify-center items-center transition-all delay-250 ${
            edit.status ? "pt-2 px-2" : "h-0 opacity-0 pointer-events-none"
          }`}
          typesArray={requestStatusTypes}
          filter={request.status}
          filterHandler={setStatusHandler}
          all={false}
        />
      </div>

      <div className="flex flex-wrap">
        {`Дата экскурсии: ${
          !compareWithDefaultDate(request.excursionDate)
            ? new DateObject(request.excursionDate).format("DD/MM/YYYY HH:mm")
            : ""
        }
        `}
        <div
          className="text-cyan-500 hover:text-white ml-2 cursor-pointer"
          onClick={() => {
            if (edit.excursionDate)
              dispatch(
                setRequestData({
                  id: request._id,
                  excursionDate: new DateObject(
                    excursionDate ? excursionDate : Date(0)
                  ).toUnix(),
                })
              );

            dispatch(setRequestsEdit(["excursionDate"]));
          }}
        >
          {!request.excursionDate ||
          compareWithDefaultDate(request.excursionDate)
            ? `${edit.excursionDate ? "Сохранить" : "Добавить"}`
            : `${edit.excursionDate ? "Сохранить" : "Изменить"}`}
        </div>
        <div
          className={`w-full flex flex-wrap gap-3 mt-5 justify-center items-center transition-all delay-250 relative z-[1] ${
            edit.excursionDate
              ? ""
              : "h-0 opacity-0 pointer-events-none translate-y-10"
          }`}
        >
          <ExcursionTimePicker
            filterDate={excursionDate}
            setFilterDate={setExcursionDate}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestItem;
