import { ActionButton } from "./Buttons";

const FilterMenu = ({
  typesArray,
  filter,
  filterHandler,
  className = "flex flex-wrap gap-3 justify-center mt-5",
  plural,
  all = true,
}) => {
  return (
    <div className={className}>
      {typesArray.map((statusType) => (
        <ActionButton
          key={statusType.id}
          onClick={() => filterHandler(statusType.id)}
          disabled={filter === statusType.id}
        >
          {plural ? statusType.titlePlural : statusType.title}
        </ActionButton>
      ))}
      {all && (
        <ActionButton
          onClick={() => filterHandler("all")}
          disabled={filter === "all"}
        >
          Все
        </ActionButton>
      )}
    </div>
  );
};

export default FilterMenu;
