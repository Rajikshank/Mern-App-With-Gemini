import React, { useState } from "react";
import { editTodo } from "../utils/Request";
import { DatePicker } from "antd";

const AddTodo = ({
  addTodo,
  text,
  setText,
  selectedTodo,
  setTodos,
  setSeclectedTodo,
  date,
  setDate,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      if (selectedTodo) {
        editTodo({
          todo_id: selectedTodo._id.toString(),
          text: text,
          completed: selectedTodo.completed,
          subtask: selectedTodo.subtask,
          date: date,
        })
          .then((value) => {
            console.log(value);
            setTodos([...value]);
          })
          .catch((err) => console.log("todo edit failed", err));
        setSeclectedTodo((prev) => null); //deselecting editing option
      } else {
        addTodo({
          _id: Date.now(),
          text: text,
          completed: false,
          subtask: [],
          date: date,
        });
      }
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-4 gap-2 ">
      <section className="bg-slate-200 flex w-full  focus-within:ring-2 focus-within:ring-blue-600 rounded-sm">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 border bg-slate-200 rounded-sm focus:outline-none "
          placeholder="Add a new todo..."
        />
        <input
          className="focus:outline-none bg-slate-200"
          type="datetime-local"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate((prev) => e.target.value)}
        />
      </section>
      {/* <button
        type="submit"
        className="bg-gray-400 text-white px-4 py-2 rounded-3xl focus:outline-none hover:bg-blue-700"
      >
        Add
      </button> */}
    </form>
  );
};

export default AddTodo;
