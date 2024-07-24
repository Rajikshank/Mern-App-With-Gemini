import React, { useEffect, useState } from "react";
import { editTodo } from "../utils/Request";
import { DatePicker } from "antd";
import run from "../utils/Gemini-api";

const AddTodo = ({
  addTodo,
  text,
  setText,
  selectedTodo,
  setTodos,
  setSeclectedTodo,
  date,
  setDate,
  loading,
  setLoading,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim()) {
      if (selectedTodo) {
        try {
          let response = await run(text);
          let Sub_tasks = response.map((item) => ({
            //mapping each subtask from gemini model to suitable mongo db model array
            task: item.subtask,
            completed: false,
          }));
          setLoading((prev) => true);
          editTodo({
            todo_id: selectedTodo._id.toString(),
            text: text,
            completed: selectedTodo.completed,
            subtask: [...Sub_tasks],
            date: date,
          })
            .then((value) => {
              console.log(value);
              setTodos([...value]);
              setLoading((prev) => false);
            })
            .catch((err) => console.log("todo edit failed", err));
        } catch (error) {
          console.log("error in generating subtaks", error);

          //adding the edited todo if the network request to gemeini api is failed without subtask
          editTodo({
            todo_id: selectedTodo._id.toString(),
            text: text,
            completed: selectedTodo.completed,
            subtask: [],
            date: date,
          })
            .then((value) => {
              console.log(value);
              setTodos([...value]);
              setLoading((prev) => false);
            })
            .catch((err) => console.log("todo edit failed", err));
        }

        setSeclectedTodo((prev) => null); //deselecting editing option
      } else {
        setLoading((prev) => true); //setting loding true to release the skelton on ui
        run(text)
          .then((value) => {
            let Sub_tasks = value.map((item) => ({
              //mapping each subtask from gemini model to suitable mongo db model array
              task: item.subtask,
              completed: false,
            }));

            console.log(Sub_tasks);

            addTodo({
              _id: Date.now(),
              text: text,
              completed: false,
              subtask: [...Sub_tasks],
              date: date,
            });
          })
          .catch((err) => {
            console.log("failed to generate subtasks...", err); // in the event of network failure the subtask array will be set as a empty array

            addTodo({
              _id: Date.now(),
              text: text,
              completed: false,
              subtask: [],
              date: date,
            });
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
