import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteRequest,
  setRequestDescription,
  setRequestStatus,
} from "../redux/features/request/requestSlice";
import { CancelButton } from "./Buttons";
import { InputDate } from "./Inputs";
import ModalYesNo from "./ModalYesNo";
import FilterMenu from "./FilterMenu";
import { requestStatusTypes } from "../constasnts";
import { DateObject } from "react-multi-date-picker";

const RequestItem = ({ request }) => {
  const dispatch = useDispatch();

  const [editDescription, setEditDescription] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [description, setDescription] = useState(request.description);
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
      dispatch(setRequestStatus({ id: request._id, status }));
      setEditStatus(false);
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
          <h1>Вы действительно хотите удалить эту заявку?</h1>
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
      <div className="flex justify-center">
        <InputDate dateRange={request.dates} editable={false} />
      </div>

      <div>{`Комментарий: ${request.comment}`}</div>

      <div className="flex flex-wrap">
        {`Описание: ${request.description}`}
        <div
          className="text-cyan-500 hover:text-white ml-2 cursor-pointer"
          onClick={() => {
            if (editDescription)
              dispatch(
                setRequestDescription({
                  id: request._id,
                  description: description,
                })
              );
            setEditDescription((prev) => !prev);
          }}
        >
          {request.description
            ? `${editDescription ? "Сохранить" : "Изменить"}`
            : `${editDescription ? "Сохранить" : "Добавить"}`}
        </div>
        <textarea
          name="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full outline-none bg-[#1e1e1e] border-cyan-500 rounded-md resize-none transition-all delay-250 ${
            editDescription ? "h-40 py-1 px-2 border " : "h-0 "
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
            setEditStatus((prev) => !prev);
          }}
        >
          Изменить
        </div>

        <FilterMenu
          className={`w-full flex flex-wrap gap-3 justify-center items-center transition-all delay-250 ${
            editStatus ? "pt-2 px-2" : "h-0 opacity-0 pointer-events-none"
          }`}
          typesArray={requestStatusTypes}
          filter={request.status}
          filterHandler={setStatusHandler}
          all={false}
        />
      </div>

      {`Дата создания: ${new DateObject(request.createdAt).format(
        `${request.status === "active" ? "DD/MM/YYYY hh:mm:ss" : "DD/MM/YYYY"}`
      )}`}
    </div>
  );
};

export default RequestItem;
