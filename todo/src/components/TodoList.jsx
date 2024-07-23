import React, { useState } from "react";
import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  toggleTodo,
  toggleDelete,
  setTodoid,
  setText
}) {
  return (
    <div className="mt-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          toggleTodo={toggleTodo}
          toggleDelete={toggleDelete}
          setTodoid={setTodoid}
          setText={setText}
        />
      ))}
    </div>
  );
}
