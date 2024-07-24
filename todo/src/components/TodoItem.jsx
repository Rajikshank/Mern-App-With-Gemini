import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { CgCircleci } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { parseISO, format, formatDistanceToNow } from "date-fns";
import SubTask from "./SubTask";
import { FaCircleArrowDown } from "react-icons/fa6";
import TodoSkeleton from "../utils/TodoSkeleton";
import { BiError } from "react-icons/bi";

export default function TodoItem({
  todo,
  toggleTodo,
  toggleDelete,
  setSeclectedTodo,
  selectedTodo,
  setText,
  setDate,
  toggleSubtask,
  loading,
}) {
  const [showsubtask, setShowSubtask] = useState(false); //show sub task handler
  const [subtaskcompleted, setSubcompleted] = useState(0);

  //function to format date to set the state variable for editing
  const convertToDatetimeLocal = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "yyyy-MM-dd'T'HH:mm");
  };

  //function to format the date to show the due for the task
  const formatRemainingTime = (dateString) => {
    const targetDate = parseISO(dateString);
    return formatDistanceToNow(targetDate, {
      includeSeconds: true,
      addSuffix: true,
    });
  };

  //calculate completed subtask in every render of todo's
  useEffect(() => {
    setSubcompleted((prev) => calculateCompleted(todo));
   setShowSubtask(prev=>false)
  }, [todo]);

  //function to calculate the percentage of completed subtasks
  const calculateCompleted = (todo) => {
    let completed_tasks = 0;

    todo.subtask.forEach((element) => {
      if (element.completed === true) completed_tasks++; // incrementing the values for main tasks
    });

    return Math.round((completed_tasks / todo.subtask.length) * 100);
  };

  return (
    <>
      {selectedTodo?._id === todo._id && loading ? (
        <TodoSkeleton />
      ) : (
        <div className=" flex flex-col ">
          <div className="px-5  flex  justify-between bg-slate-200 rounded shadow p-4 mb-2">
            <div
              className={`    flex       gap-1  ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              <CgCircleci className="mt-2" />
              <span className="flex flex-col">
                <h1 className="font-bold ">{todo.text}</h1>
                <div className="flex ">
                  <h3 className="text-xs px-1 ">
                    {" "}
                    Due : {todo.date && formatRemainingTime(todo.date)}{" "}
                  </h3>{" "}
                  {Number.isInteger(subtaskcompleted) && (
                    <h1 className="text-xs px-1 text-green-500">
                      {subtaskcompleted}% completed
                    </h1>
                  )}
                  {todo.subtask.length > 0 && (
                    <button
                      className="flex text-xs items-center "
                      onClick={() => setShowSubtask((prev) => !prev)}
                    >
                      {" "}
                      <FaCircleArrowDown className="m-1" /> Subtasks
                    </button>
                  )}
                  {todo.subtask.length === 0 && (
                    <h1 className="text-xs text-red-500 flex items-center px-1 ">
                      {" "}
                      <BiError />
                      Failed to Generate Subtasks !!!
                    </h1>
                  )}
                </div>
              </span>
            </div>

            <div className="flex gap-5 pl-5 items-end ">
              <button
                onClick={() => toggleTodo(todo._id.toString())}
                className={`px-2 py-1 rounded ${
                  todo.completed
                    ? "bg-red-500 hover:bg-red-300"
                    : "bg-green-500 hover:bg-green-300"
                } text-white rounded-full flex items-center gap-2 h-min `}
              >
                {todo.completed ? <FaUndoAlt /> : <FaCheck />}
              </button>
              <button
                onClick={() => {
                  setSeclectedTodo((prev) => todo);
                  setText((prev) => todo.text);
                  setDate((prev) => convertToDatetimeLocal(todo.date));
                }}
                className={`px-2 py-1  bg-slate-600 hover:bg-slate-500 rounded-full
        } text-white flex items-center gap-2 h-min ${
          selectedTodo !== null &&
          selectedTodo._id.toString() === todo._id &&
          "cursor-not-allowed"
        } `}
              >
                <FaEdit />
              </button>
              <button
                onClick={() => toggleDelete(todo._id.toString())}
                className={`px-2 py-1  bg-slate-600 hover:bg-slate-500 rounded-full
        } text-white flex items-center gap-2 h-min`}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
          {showsubtask && (
            <SubTask
              todo={todo}
              toggleSubtask={toggleSubtask}
              calculatecompleted={(todo) =>
                setSubcompleted((prev) => calculateCompleted(todo))
              }
            />
          )}
        </div>
      )}
    </>
  );
}
