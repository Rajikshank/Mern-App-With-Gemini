import React, { useState } from "react";
import { editTodo } from "../utils/Request";

const AddTodo = ({
  addTodo,
  text,
  setText,
  selectedTodo,
  setTodos,
  setSeclectedTodo,
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
          text,
          completed: false,
          subtask: [],
        });
      }
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-4 gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border bg-slate-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Add a new todo..."
      />
      <button
        type="submit"
        className="bg-gray-400 text-white px-4 py-2 rounded-3xl focus:outline-none hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
};

export default AddTodo;
