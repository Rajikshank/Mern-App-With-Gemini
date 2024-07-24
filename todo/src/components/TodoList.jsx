import React, { useState } from "react";
import TodoItem from "./TodoItem";
import TodoSkeleton from "../utils/TodoSkeleton";

export default function TodoList({
  todos,
  toggleTodo,
  toggleDelete,
  selectedTodo,
  setSeclectedTodo,
  setText,
  setDate,
  toggleSubtask,
  loading,
}) {
  console.log("loading is ", loading);
  return (
    <>
      {loading ? (
        <TodoSkeleton />
      ) : (
        <div className="mt-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              toggleTodo={toggleTodo}
              toggleDelete={toggleDelete}
              selectedTodo={selectedTodo}
              setSeclectedTodo={setSeclectedTodo}
              setText={setText}
              setDate={setDate}
              toggleSubtask={toggleSubtask}
            />
          ))}
        </div>
      )}
    </>
  );
}
