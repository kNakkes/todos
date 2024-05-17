import "./styles/App.css";
import React, { useEffect, useMemo } from "react";
import ToDoFilter from "./components/UI/ToDoFilter/ToDoFilter";
import { useState } from "react";
import TaskModal from "./components/UI/TaskModal/TaskModal";
import TaskList from "./components/TaskList/TaskList";
import PostService from "./API/PostService";
import axios from "axios";
import BASE_URL from "./API/BaseUrl";

const filters = [
  { value: "All", name: "All" },
  { value: "Active", name: "Active" },
  { value: "Done", name: "Done" },
];

function App() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [isPostLoading, setIsPostLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setIsPostLoading(true);
    const fetchedTasks = await PostService.getAll();
    setTasks(fetchedTasks.data);
    setIsPostLoading(false);
  }

  const filteredTasks = useMemo(() => {
    switch (selectedFilter) {
      case "Active":
        return tasks.filter((t) => t.completed === "false");
      case "Done":
        return tasks.filter((t) => t.completed === "true");

      default:
        return tasks;
    }
  }, [tasks, selectedFilter]);

  const selectFilter = (filterValue) => {
    setSelectedFilter(filterValue);
  };

  const createTask = (newTask) => {
    axios.post(`${BASE_URL}/post`, JSON.stringify(newTask)).catch((error) => {
      console.log(error);
    });
    setTasks([...tasks, newTask]);
  };

  const removeTask = (task) => {
    axios
      .delete(`${BASE_URL}/delete?id=${task.id}`)
      .then((fetchedTasks) =>
        fetchedTasks.status === 200
          ? setTasks(tasks.filter((t) => t.id !== task.id))
          : console.log("Error deleting")
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleComplete = (id, completed) => {
    axios
      .post(`${BASE_URL}/edit`, {
        id,
        completed: completed === "true" ? "false" : "true",
      })
      .then((fetchedTasks) => {
        if (fetchedTasks.status === 200) {
          setTasks((tasks) => {
            return tasks.map((task) => {
              if (task.id === id) {
                task.completed === "false"
                  ? (task.completed = "true")
                  : (task.completed = "false");
              }
              return task;
            });
          });
        }
      });
  };

  return (
    <div className="App">
      <ToDoFilter
        value={selectedFilter}
        onChange={selectFilter}
        filters={filters}
      />
      {isPostLoading ? (
        <h1>Tasks is loading...</h1>
      ) : (
        <TaskList
          remove={removeTask}
          tasks={filteredTasks}
          toggler={toggleComplete}
        />
      )}

      <TaskModal create={createTask} />
    </div>
  );
}

export default App;
