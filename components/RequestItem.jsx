import { useState } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import {
  deleteRequest,
  setRequestDescription,
  setRequestStatus,
} from "../redux/features/request/requestSlice";
import { ActionButton, CancelButton } from "./Buttons";
import { InputDate } from "./Inputs";

const RequestItem = ({ request }) => {
  const [editDescription, setEditDescription] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [description, setDescription] = useState(request.description);
  const dispatch = useDispatch();
  const inputStyle =
    "text-black bg-gray-200 border py-1 px-2 mb-2 text-xs outline-none placeholder:text-gray-700 rounded-sm";
  return (
    <div className="flex flex-col gap-2 p-2 border border-gray-600 rounded-lg w-full sm:w-2/3 relative">
      <div className="absolute top-2 right-2">
        <CancelButton
          onClick={() => {
            dispatch(deleteRequest({ id: request._id }));
            console.log("Post deleted!");
          }}
        >
          Удалить заявку
        </CancelButton>
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
          request.status === "new"
            ? "Новая"
            : `${request.status === "active" ? "Активная" : "Завершённая"}`
        }`}
        <div
          className="text-cyan-500 hover:text-white ml-2 cursor-pointer"
          onClick={() => {
            setEditStatus((prev) => !prev);
          }}
        >
          Изменить
        </div>
        <div
          className={`w-full flex gap-3 justify-center items-center transition-all delay-250 ${
            editStatus ? "h-10 pt-2 px-2" : "h-0 opacity-0 pointer-events-none"
          }`}
        >
          <ActionButton
            className="w-28 rounded-sm py-2 px-4 text-xs"
            disabled={request.status === "new"}
            onClick={() => {
              dispatch(setRequestStatus({ id: request._id, status: "new" }));
              setEditStatus(false);
            }}
          >
            Новая
          </ActionButton>
          <ActionButton
            className="w-28 rounded-sm py-2 px-4 text-xs"
            disabled={request.status === "active"}
            onClick={() => {
              dispatch(setRequestStatus({ id: request._id, status: "active" }));
              setEditStatus(false);
            }}
          >
            Активная
          </ActionButton>
          <ActionButton
            className="w-28 rounded-sm py-2 px-4 text-xs"
            disabled={request.status === "fulfilled"}
            onClick={() => {
              dispatch(
                setRequestStatus({ id: request._id, status: "fulfilled" })
              );
              setEditStatus(false);
            }}
          >
            Завершённая
          </ActionButton>
        </div>
      </div>

      <div>
        {`Дата создания:`}
        <Moment
          className="m-2"
          date={request.createdAt}
          format="D. M. YYYY г."
        />
      </div>
    </div>
  );
};

export default RequestItem;
