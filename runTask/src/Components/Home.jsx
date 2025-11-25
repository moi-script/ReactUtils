import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./modal.css";
import style from "./Home.module.css";
import { Modal } from "../Modals/Modal.jsx";




 function getUserData(users) {
  const userData = JSON.parse(localStorage.getItem("users"));

  const getUser = () => {
    return userData.accounts.filter((item) => {
      if (item.email === users.email && item.password === users.password) {
        return true;
      }
    });
  };

  if (userData) {
    return getUser(users);
  }

  console.log("Null user data ");
  return null;
}



function addTaskDb(email, password, taskInfo) {
  const userList = JSON.parse(localStorage.getItem("users"));
  console.log("User list ::", userList.accounts);

  if (Array.isArray(userList.accounts) && userList.accounts.length > 0) {
    const addedTask = userList.accounts.map((task) => {
      if (task.email === email && task.password === password) {
        task.taskList.push(taskInfo);
        return task;
      }
      return task;
    });
    console.log("This is the updated task ", addedTask);
    localStorage.setItem("users", JSON.stringify({accounts : addedTask}));
    alert('User task Added to db');
  }


  return null;
}

export function Home() {
  const [userDetails, setUserDetails] = useState(null);
  const [taskList, setTaskList] = useState(null);
  const location = useLocation();
  const [taskInfo, setTaskInfo] = useState(null);
  const { email, password } = location.state || {};
  const [isSubmitted, setIsSubmitted] = useState(0);


  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    setUserDetails(getUserData({ email, password }));
  }, [isSubmitted]);

  useEffect(() => {
    if (Array.isArray(userDetails) && userDetails.length > 0) {
      const [task] = userDetails;
      setTaskList(task.taskList);
    } else {
      setTaskList(null);
    }
  }, [userDetails, isSubmitted]);

  const hanldeChange = (e) => {
    const event = e.target;

    setTaskInfo({ ...taskInfo, [event.name]: event.value });
    console.log("Task info", taskInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addTaskDb(email, password, taskInfo);
    setIsSubmitted(isSubmitted + 1);
  };

  return (
    <div className={style.home}>
      {taskList &&
        taskList.map((task, i) => (
          <div key={i} className={style.taskContainer}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
          </div>
        ))}
      <h1></h1>
      <button className={style.addButton} onClick={open}>
        Add Task
      </button>

      <Modal show={isOpen} onClose={close}>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="" className="formHeader">
            Create Task
          </label>
          <input
            className="inputForm"
            type="text"
            name="title"
            placeholder="title"
            onChange={hanldeChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="description"
            onChange={hanldeChange}
          ></textarea>
          <button
            className="submitTaskBtn"
            type="submit"
            onClick={() => {
              close();
            }}
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}
