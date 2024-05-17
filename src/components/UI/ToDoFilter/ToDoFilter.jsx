import React from "react";
import classes from "./ToDoFilter.module.css";

const ToDoFilter = ({ filters, value, onChange }) => {
  const handleChangeFIlter = (event) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <h1 style={{ color: "red", textAlign: "center" }}>TODOS</h1>
      <div className={classes.filters}>
        {filters.map((filter) => (
          <button
            className={`${
              value === filter.value ? classes.active_button : classes.button
            }`}
            onClick={handleChangeFIlter}
            key={filter.value}
            value={filter.value}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToDoFilter;
