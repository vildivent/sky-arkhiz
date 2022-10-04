import { useState } from "react";
import { ActionButton } from "./Buttons";
import { InputGroupSize } from "./Inputs";

const GroupFilter = ({ filterGroup, setFilterGroup }) => {
  const [selected, setSelected] = useState(false);

  return (
    <div className={`flex items-center ${selected ? "gap-2" : "selection:"} `}>
      <ActionButton
        onClick={() => setSelected((prev) => !prev)}
        className={`rounded-md py-2 px-4 text-sm w-[10.5rem]`}
      >
        {filterGroup || "Фильтр по группам"}
      </ActionButton>

      <InputGroupSize
        className={`${
          selected ? "py-1 px-2 border w-10" : "w-0"
        }  bg-[#1e1e1e] text-center border-cyan-500 transition-all delay-250 text-md outline-none rounded-sm`}
        value={filterGroup}
        onBlur={(e) => {
          setSelected(false);
        }}
        onChange={(e) => setFilterGroup(e.target.value)}
        onClick={() => {
          setFilterGroup("");
        }}
      />
    </div>
  );
};

export default GroupFilter;
