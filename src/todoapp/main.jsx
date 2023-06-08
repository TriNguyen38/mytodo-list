import React from "react";
import { useState } from "react";

function Main() {
  const storageJobs = JSON.parse(localStorage.getItem("tasks"));
  const [tasks, setTasks] = useState(
    Array.isArray(storageJobs) ? storageJobs : []
  );
  const [newTask, setNewTask] = useState("");
  const [currentTab, setCurrentTab] = useState("all");

  const handleAddTask = () => {
    setTasks((prev) => {
      const newJobs = [...prev, { name: newTask, completed: false }];
      console.log(newJobs);
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("tasks", jsonJobs);
      return newJobs;
    });
    setNewTask("");
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    const removeTasks = JSON.stringify(newTasks);
    localStorage.setItem("tasks", removeTasks);
    localStorage.removeItem("tasks[]");
  };

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  const filteredTasks = () => {
    if (currentTab === "active") {
      return tasks.filter((task) => !task.completed);
    } else if (currentTab === "complete") {
      return tasks.filter((task) => task.completed);
    } else {
      return tasks;
    }
  };

  const handleToggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
    const updateTasks = JSON.stringify(newTasks);
    localStorage.setItem("tasks", updateTasks);
  };

  return (
    <div className="container-box">
      <div className="todoList">
        <h1>Todo List</h1>
        <div>
          <input
            className="yourJob"
            placeholder="todo..."
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          />
          <button className="btnAdd" onClick={handleAddTask}>
            Add
          </button>
        </div>
        <div className="btnArea">
          <button
            className={currentTab === "all" ? "active" : ""}
            onClick={() => handleTabClick("all")}
          >
            All
          </button>
          <button
            className={currentTab === "active" ? "active" : ""}
            onClick={() => handleTabClick("active")}
          >
            Active
          </button>
          <button
            className={currentTab === "complete" ? "active" : ""}
            onClick={() => handleTabClick("complete")}
          >
            Done
          </button>
        </div>
        <ul>
          {filteredTasks().map((task, index) => (
            <li key={index}>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.name}
              </span>
              <button onClick={() => handleToggleComplete(index)}>
                {task.completed ? "undo" : "done"}
              </button>
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Main;
