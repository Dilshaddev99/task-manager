import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { LuSendHorizonal } from "react-icons/lu";
import "./App.css";

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [copyIcon, setCopyIcon] = useState(false);
  const [dark, setDark] = useState(true);
  const [taskData, setTaskData] = useState(
    JSON.parse(localStorage.getItem("taskData")) || []
  );


  const darkThemeHandler = () => {
    setDark(true);
    document.querySelector("body").setAttribute("mode", "dark");
  };

  const lightThemeHandler = () => {
    setDark(false);
    document.querySelector("body").setAttribute("mode", "light");
  };

  const onTodoSubmit = () => {
    setCopyIcon(true);
    setTimeout(() => {
      setCopyIcon(false);
    }, 2000);

    const task = {
      id: taskData.length + 1,
      task: taskInput,
    };

    taskData.push(task);

    localStorage.setItem("taskData", JSON.stringify(taskData));
  };

  const deleteTask = (id) => {
    const tasks = taskData.filter((task)=> task.id !== id)
    localStorage.setItem("taskData", JSON.stringify(tasks));
    window.location.reload()
  }

  return (
    <div className="parent">
      <div className="shape1"></div>
      <div className="shape2"></div>
      <div className="mainContainer">
        <div className="theme">
          {dark ? (
            <MdLightMode size={30} onClick={() => lightThemeHandler()} />
          ) : (
            <BsFillMoonStarsFill size={30} onClick={() => darkThemeHandler()} />
          )}
        </div>
        <h1>
          Make your Task Easy with <span className="logo">TaskManager</span>
        </h1>
        <div className="container">
          <div className="resultContainer">
            <input
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              type="text"
              placeholder="Add New Task To Gallery"
              required
              id="resultInput"
            />
            <div className="icons">
              <IoClose
                className="copyIcon"
                size={35}
                onClick={() => setTaskInput("")}
              />
              {!copyIcon ? (
                <LuSendHorizonal
                  className="copyIcon"
                  size={30}
                  onClick={() => onTodoSubmit()}
                />
              ) : (
                <MdOutlineFileDownloadDone className="copyIcon" size={40} />
              )}
            </div>
          </div>
        </div>
        <div className="tasksContainer">
          {taskData.map((i, index) => (
            <div className="todo" key={index}>
              {i.task}
              <div className="actions">
  
                <span className="delete" onClick={(e)=> deleteTask(i.id)}>
                  <MdDeleteOutline  size={28}/>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
