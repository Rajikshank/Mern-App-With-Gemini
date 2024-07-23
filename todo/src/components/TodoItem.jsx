import React from "react";
import { FaCheck } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { CgCircleci } from "react-icons/cg";

export default function TodoItem({
  todo,
  toggleTodo,
  toggleDelete,
  setSeclectedTodo,
  selectedTodo,
  setText,
}) {
  return (
    <div className="px-10 flex justify-between bg-white rounded shadow p-4 mb-2">
      <div
        className={`    flex  bg-red-400    items-center gap-1  ${
          todo.completed ? "line-through text-gray-400" : ""
        }`}
      >
        <CgCircleci />
        <span className="">{todo.text}</span>
      </div>
      <div className="flex gap-5 px-10">
        <button
          onClick={() => toggleTodo(todo._id.toString())}
          className={`px-4 py-2 rounded ${
            todo.completed
              ? "bg-red-500 hover:bg-red-300"
              : "bg-green-500 hover:bg-green-300"
          } text-white rounded-full flex items-center gap-2 h-min `}
        >
          {todo.completed ? <FaUndoAlt /> : <FaCheck />}
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button
          onClick={() => {
            setSeclectedTodo((prev) => todo);
            setText((prev) => todo.text);
          }}
          className={`px-4 py-2  bg-slate-600 hover:bg-slate-500 rounded-full
        } text-white flex items-center gap-2 h-min ${
         selectedTodo!==null && selectedTodo._id.toString() === todo._id && "cursor-not-allowed"
        } `}
        >
          <FaRegTrashAlt />
          Edit
        </button>
        <button
          onClick={() => toggleDelete(todo._id.toString())}
          className={`px-4 py-2  bg-slate-600 hover:bg-slate-500 rounded-full
        } text-white flex items-center gap-2 h-min`}
        >
          <FaRegTrashAlt />
          Remove
        </button>
      </div>
    </div>
  );
}
