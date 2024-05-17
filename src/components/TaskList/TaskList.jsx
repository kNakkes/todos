import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import classes from "./TaskList.module.css";

const TaskList = ({ tasks, remove, toggler }) => {
  if (!tasks.length) {
    return <h1>Tasks not found</h1>;
  }
  return (
    <ul className={classes.ul}>
      {tasks.map((task) => (
        <TaskItem remove={remove} task={task} key={task.id} toggler={toggler} />
      ))}
    </ul>
  );
};

export default TaskList;
