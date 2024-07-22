import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import {
  deletetodo,
  editTodo,
  getTodos,
  logout,
  sendTodo,
} from "../utils/Request";

export default function Dashboard() {
  const [todos, setTodos] = useState([
    { _id: 1, text: "Learn React", completed: false, subtask: [] },
    { _id: 2, text: "Learn Tailwind CSS", completed: false, subtask: [] },
  ]);

  //ensure to load all the todos at the begining of the page render
  useEffect(() => {
    getTodos().then((value) => {
      setTodos((prev) => [...value]);
    });
  }, []);

  const addTodo = async (todo) => {
    let response = await sendTodo(todo);
    setTodos([...response]);
    console.log("Todo added Response", response);
  };

  const toggleTodo = async (id) => {
    let temp = todos.filter((todo) => todo._id.toString() === id);
    if (temp.length > 0) {
      editTodo({
        todo_id: temp[0]._id,
        text: temp[0].text,
        completed: !temp[0].completed,
        subtask: temp[0].subtask,
      }).then((value) => {
        console.log("todos updated");
        setTodos((prev) => [...value]);
      });
    }
  };

  const toggleDelete = async (id) => {
    try {
      deletetodo(id);
      setTodos((prev) => prev.filter((val) => val._id.toString() !== id));
    } catch (error) {}
  };

  console.log(todos);
  return (
    <div className="min-h-screen ">
      <div className="p-4 bg-gray-800 w-screen shadow-md flex flex-col items-center">
        <header className="  text-white p-4 text-center">
          <h1 className="text-2xl font-bold">Todo Dashboard</h1>
        </header>
      </div>
      <div className="container mx-auto p-4 w-1/2">
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          toggleDelete={toggleDelete}
        />
      </div>
    </div>
  );
}
