import { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  NavLink,
  Link,
  Navigate
} from "react-router-dom";
import { Login } from "./Login.jsx";
import { Home } from "./Home.jsx";

export function Rs() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/home' element={<Home/>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}
