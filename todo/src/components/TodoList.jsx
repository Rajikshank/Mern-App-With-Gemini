import React, { useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, toggleTodo, toggleDelete }) => {
  return (
    <div className="mt-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          toggleTodo={toggleTodo}
          toggleDelete={toggleDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
