import React from "react";
import classes from "./TaskItem.module.css";

const TaskItem = (props) => {
  const remover = (event) => {
    event.stopPropagation();
    props.remove(props.task);
  };
  return (
    <div
      onClick={() => props.toggler(props.task.id, props.task.completed)}
      className={classes.task_item}
    >
      <button className={classes.checkButton}>
        <i
          className={`${
            props.task.completed === "true" ? `classes.bi bi-check2` : ""
          }`}
        ></i>
      </button>
      <li className={classes.list_item} key={props.task.id}>
        {props.task.title}
      </li>
      <button onClick={remover} className={classes.removeButton}>
        <i className="bi bi-trash3"></i>
      </button>
    </div>
  );
};

export default TaskItem;
