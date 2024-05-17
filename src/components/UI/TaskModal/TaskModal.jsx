import React, { useState } from "react";
import classes from "./TaskModal.module.css";

const TaskModal = ({ create }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const addNewTask = (event) => {
    event.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      completed: "false",
    };
    create(newTask);
    setTitle("");
  };

  const eventListener = (event) => {
    setTitle(event.target.value);
  };

  const rootClasses = [classes.formModal];
  if (visible === true) {
    rootClasses.push(classes.formModal_active);
  }

  const closeTaskModal = (event) => {
    setVisible(false);
    event.preventDefault();
  };

  return (
    <div>
      <form className={rootClasses.join(" ")}>
        <button className={classes.closeBtn} onClick={closeTaskModal}>
          <i className="bi bi-x"></i>
        </button>
        <input
          className={classes.input}
          onChange={eventListener}
          value={title}
          placeholder="Enter task"
        />
        <button className={classes.redButton} onClick={addNewTask}>
          Add task
        </button>
      </form>
      <button
        style={{ color: "#e30808" }}
        className={classes.button}
        onClick={() => setVisible(true)}
      >
        <i className="bi bi-plus-lg"></i>
      </button>
    </div>
  );
};

export default TaskModal;
