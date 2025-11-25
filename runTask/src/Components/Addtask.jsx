import { useState } from "react";
import style from "./Home.module.css";

export function TaskModal({ show, onClose }) {
  
  return (
    <>
      <div className={`task-modal ${show ? "open" : ""}`} onClick={onClose}>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" onChange={handleChange} required />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
