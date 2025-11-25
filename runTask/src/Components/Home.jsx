import {  useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDataLocal } from "./Login.jsx";
import "./modal.css";
import style from "./Home.module.css";
import { Modal } from "../Modals/Modal.jsx";





export function Home() {
  const [userDetails, setUserDetails] = useState(null);
  const [taskList, setTaskList] = useState(null);
  const location = useLocation();
  const [taskInfo, setTaskInfo] = useState(null);
  const { email, password } = location.state || {};

  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    setUserDetails(getDataLocal({ email, password }));
  }, []);

  useEffect(() => {
    if (Array.isArray(userDetails) && userDetails.length > 0) {
      const [task] = userDetails;
      setTaskList(task.taskList);
    } else {
      setTaskList(null);
    }
  }, [userDetails]);


  const hanldeChange = (e) => {
    const event = e.target;

    setTaskInfo({...taskInfo, [event.name] : event.value});
    console.log('Task info', taskInfo);
  }


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

        <form className="form" >
          <label htmlFor="" className="formHeader">Create Task</label>
          <input className="inputForm" type="text" name="title" placeholder="title" onChange={hanldeChange}/>
          <textarea name="description" placeholder="Description"  className="description" onChange={hanldeChange}></textarea>
          <button className="submitTaskBtn" type="submit" onClick={() => {
            close();
            
          }}>Submit</button>
        </form>

      </Modal>
    </div>
  );
}
