import React from "react";
import { style } from "../styles/style";
import { IoClose, IoSearch } from "react-icons/io5";

const SearchBar = ({ value, onChange, reset }: SearchBarProps) => {
  return (
    <div className="flex gap-2 w-full">
      <IoSearch className="text-3xl" />
      <input
        type="text"
        placeholder="Поиск..."
        value={value}
        onChange={onChange}
        className={`${style.input} border-gray-400`}
      />
      <button
        className="text-4xl hover:text-cyan-500 cursor-pointer"
        onClick={reset}
      >
        <IoClose />
      </button>
    </div>
  );
};

export default SearchBar;

type SearchBarProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  reset: React.MouseEventHandler<HTMLButtonElement>;
};
