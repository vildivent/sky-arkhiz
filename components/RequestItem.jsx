import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteRequest,
  setRequestData,
} from "../redux/features/request/requestSlice";
import { CancelButton } from "./Buttons";
import { InputDate, InputGroupSize } from "./Inputs";
import ModalYesNo from "./ModalYesNo";
import FilterMenu from "./FilterMenu";
import { requestStatusTypes } from "../constasnts";
import { DateObject } from "react-multi-date-picker";
import ExcursionTimePicker from "./ExcursionTimePicker";
import { compareWithDefaultDate } from "../utils/compareWithDefaultDate";
import EditButton from "./Buttons/EditButton";
import EditCancelButton from "./Buttons/EditCancelButton";

const RequestItem = ({ request, settings }) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [groupSize, setGroupSize] = useState(request.groupSize);
  const [description, setDescription] = useState(request.description);

  const initialDate = compareWithDefaultDate(request.excursionDate)
    ? null
    : request.excursionDate;
  const [excursionDate, setExcursionDate] = useState(initialDate);
  const [groupNumber, setGroupNumber] = useState(request.groupNumber || 0);

  const spanStyle = "text-blue-300";

  const initialEditState = {
    name: false,
    phoneNumber: false,
    groupSize: false,
    dates: false,
    comment: false,
    description: false,
    status: false,
    excursionDate: false,
    groupNumber: false,
  };
  const setRequestsEdit = (state, type) => ({
    ...state,
    [type]: !state[type],
  });
  const [edit, dispatchEdit] = useReducer(setRequestsEdit, initialEditState);

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
      dispatch(setRequestData({ id: request._id, status, settings }));
      dispatchEdit("status");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:p-2 pl-5 border border-gray-600 rounded-lg w-full sm:w-2/3 relative z-0">
      {/*delete modal*/}
      <div className="absolute top-2 right-2">
        <CancelButton onClick={() => setModalIsOpen(true)}>
          Удалить
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

      {/*name*/}
      <div>
        {`Имя: `}
        <span className={`${spanStyle}`}>{request.name}</span>
      </div>

      {/*phoneNumber*/}
      <div>
        Телефон:
        <a
          href={`tel:${request.phoneNumber}`}
          className="ml-2 text-cyan-500 hover:text-white"
        >{`${request.phoneNumber}`}</a>
      </div>

      {/*groupSize*/}
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-2">
          {`Размер группы: `}
          <span className={`${spanStyle}`}>{request.groupSize}</span>
          {`чел.`}
          <EditButton
            isEdit={edit.groupSize}
            isDefault={!+request.groupSize}
            onClick={() => {
              if (edit.groupSize)
                dispatch(
                  setRequestData({
                    id: request._id,
                    groupSize: +groupSize,
                  })
                );
              dispatchEdit("groupSize");
            }}
          />
          <EditCancelButton
            isEdit={edit.groupSize}
            onClick={() => {
              setGroupSize(request.groupSize);
              dispatchEdit("groupSize");
            }}
          />
        </div>

        <InputGroupSize
          className={`${
            edit.groupSize ? "py-1 px-2 border" : "h-0"
          } w-full bg-[#1e1e1e] border-cyan-500 transition-all delay-250 text-md outline-none rounded-sm`}
          value={groupSize}
          onChange={(e) => setGroupSize(e.target.value)}
          onClick={() => setGroupSize("")}
        />
      </div>

      {/*dates*/}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {`Даты: `}
          <span
            className={`${spanStyle}`}
          >{`${request.dates[0]} ~ ${request.dates[1]}`}</span>
        </div>{" "}
        <div className="flex sm:justify-center relative z-0">
          <InputDate dateRange={request.dates} editable={false} />
        </div>
      </div>

      {/*comment*/}
      <div className="flex flex-wrap gap-2">
        {`Комментарий: `}
        <span className={`${spanStyle}`}>{request.comment}</span>
      </div>

      {/*createdAt*/}
      <div className="flex flex-wrap gap-2">
        {`Дата создания: `}
        <span className={`${spanStyle}`}>
          {new DateObject(request.createdAt).format("DD/MM/YYYY HH:mm")}
        </span>
      </div>

      {/*description*/}
      <div className="flex flex-wrap gap-x-2">
        {`Описание: `}
        <span className={`${spanStyle}`}>{request.description}</span>
        <EditButton
          isEdit={edit.description}
          isDefault={!request.description}
          onClick={() => {
            if (edit.description)
              dispatch(
                setRequestData({
                  id: request._id,
                  description,
                })
              );
            dispatchEdit("description");
          }}
        />
        <EditCancelButton
          isEdit={edit.description}
          onClick={() => {
            setDescription(request.description);
            dispatchEdit("description");
          }}
        />

        <textarea
          name="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full outline-none bg-[#1e1e1e] border-cyan-500 rounded-md resize-none transition-all delay-250 ${
            edit.description ? "h-40 py-1 px-2 border" : "h-0"
          }`}
        />
      </div>

      {/*status*/}
      <div className="flex flex-wrap gap-x-2">
        {`Статус: `}
        <span className={`${spanStyle}`}>
          {requestStatusTypes.find((item) => item.id === request.status)
            ?.title || "Ошибка"}
        </span>
        {!edit.status && (
          <EditButton
            isEdit={edit.status}
            onClick={() => dispatchEdit("status")}
          />
        )}

        <EditCancelButton
          isEdit={edit.status}
          onClick={() => {
            dispatchEdit("status");
          }}
        />

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

      {/*excursionDate*/}
      <div className="flex flex-wrap gap-x-2">
        {`Дата экскурсии: `}
        <span className={`${spanStyle}`}>
          {!compareWithDefaultDate(request.excursionDate)
            ? new DateObject(request.excursionDate).format("DD/MM/YYYY HH:mm")
            : ""}
        </span>
        <EditButton
          isEdit={edit.excursionDate}
          isDefault={
            !request.excursionDate ||
            compareWithDefaultDate(request.excursionDate)
          }
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
            dispatchEdit("excursionDate");
          }}
        />
        <EditCancelButton
          isEdit={edit.excursionDate}
          onClick={() => {
            setExcursionDate(initialDate);
            dispatchEdit("excursionDate");
          }}
        />

        <div
          className={`w-full flex flex-wrap gap-3 justify-center items-center transition-all delay-250 relative z-[1] ${
            edit.excursionDate ? "mt-2" : "h-0 opacity-0 pointer-events-none"
          }`}
        >
          <ExcursionTimePicker
            filterDate={excursionDate}
            setFilterDate={setExcursionDate}
            dateRange={request.dates}
          />
        </div>
      </div>

      {/*groupNumber*/}
      <div className="flex flex-col">
        <div className="flex gap-x-2">
          {`Номер группы: `}
          <span className={`${spanStyle}`}>
            {request.groupNumber ? request.groupNumber : ""}
          </span>
          <EditButton
            isEdit={edit.groupNumber}
            isDefault={!+request.groupNumber}
            onClick={() => {
              if (edit.groupNumber)
                dispatch(
                  setRequestData({
                    id: request._id,
                    groupNumber: +groupNumber,
                  })
                );
              dispatchEdit("groupNumber");
            }}
          />
          <EditCancelButton
            isEdit={edit.groupNumber}
            onClick={() => {
              setGroupNumber(request.groupNumber);
              dispatchEdit("groupNumber");
            }}
          />
        </div>

        <InputGroupSize
          className={`${
            edit.groupNumber ? "py-1 px-2 border" : "h-0"
          } w-full bg-[#1e1e1e] border-cyan-500 transition-all delay-250 text-md outline-none rounded-sm`}
          value={groupNumber}
          onChange={(e) => setGroupNumber(e.target.value)}
          onClick={() => {
            setGroupNumber("");
          }}
        />
      </div>
    </div>
  );
};

export default RequestItem;
