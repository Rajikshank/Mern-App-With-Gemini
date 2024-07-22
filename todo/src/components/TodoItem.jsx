import React from "react";
import { FaCheck } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { CgCircleci } from "react-icons/cg";

const TodoItem = ({ todo, toggleTodo, toggleDelete }) => {
  return (
    <div
      className={`group flex justify-around items-center gap-1  p-4 mb-2 bg-white rounded shadow ${
        todo.completed ? "line-through text-gray-400" : ""
      }`}
    >
      <CgCircleci />
      <span className="flex-1 ">{todo.text}</span>
      <div className="flex gap-5">
        <button
          onClick={() => toggleTodo(todo._id.toString())}
          className={`px-4 py-2 rounded ${
            todo.completed
              ? "bg-red-500 hover:bg-red-300"
              : "bg-green-500 hover:bg-green-300"
          } text-white rounded-full flex items-center gap-2 group `}
        >
          {todo.completed ? <FaUndoAlt /> : <FaCheck />}
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button
          onClick={() => toggleDelete(todo._id.toString())}
          className={`px-4 py-2  bg-slate-600 hover:bg-slate-500 rounded-full
        } text-white flex items-center gap-2`}
        >
          <FaRegTrashAlt />
          Remove
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
