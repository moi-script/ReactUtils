import { use, useEffect, useState } from "react";
import { useNavigate, NavLink, Navigate, Link } from "react-router-dom";
import style from "./Home.module.css";

// needs to fetch the user data first with input name
// if exist passed the data to query -> then use in task
// if not exist passed not exist to create new tasks

const users = {
  accounts: [
    {
      email: "alice123@gmail.com",
      password: "passAlice!",
      taskList: [
        { title: "Buy groceries", description: "Milk, eggs, bread", taskId: 1 },
        {
          title: "Study React",
          description: "Finish hooks chapter",
          taskId: 2,
        },
      ],
    },
    {
      email: "johnDoe@yahoo.com",
      password: "johnPass99",
      taskList: [
        { title: "Workout", description: "Gym - legs day", taskId: 1 },
        {
          title: "Read book",
          description: "Atomic Habits Chapter 3",
          taskId: 2,
        },
      ],
    },
    {
      email: "maria_dev@outlook.com",
      password: "mariaDev2025",
      taskList: [
        { title: "Build API", description: "Create user routes", taskId: 1 },
        { title: "Fix bug", description: "Login token not saving", taskId: 2 },
      ],
    },
    {
      email: "tester007@testmail.com",
      password: "secretTest",
      taskList: [
        {
          title: "Test feature",
          description: "Check dashboard loading",
          taskId: 1,
        },
        {
          title: "Write report",
          description: "Document API issues",
          taskId: 2,
        },
      ],
    },
  ],
};

function setDummies(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

 function getDataLocal(users) {
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

export function Login() {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const event = e.target;
    setUser({ ...user, [event.name]: event.value });
  };

  useEffect(() => {
    setDummies(users);
  }, []);

  //    email: "alice123@gmail.com",
  //       password: "passAlice!",

  const hanldeSubmit = (e) => {
    e.preventDefault();

    const userData = getDataLocal(user);
    if (userData.length > 0) {
      const [data] = userData;
      const { email, password } = data;
      navigate("/home", { state: { email, password } });
    } else {
        console.log('CLik');
        alert('Invalid Account');
         navigate("/");
    }
  };

  return (
    <>
      <div className={style.formContainer}>
        <form onSubmit={hanldeSubmit} className={style.loginForm}>
          <label htmlFor="Header" className={style.formHeader}>
            Login
          </label>

          <input
            type="text"
            name="email"
            placeholder="Email"
            className={style.loginInput}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={style.loginInput}
            onChange={handleChange}
          />

          <input type="submit" className={style.submitButton} />
          <Link to="/create" className={style.noAccount}>
            No account yet? create account
          </Link>
        </form>
      </div>
    </>
  );
}
