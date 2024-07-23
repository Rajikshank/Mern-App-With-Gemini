import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import { deletetodo, editTodo, getTodos, sendTodo } from "../utils/Request";
import Header from "./Header";
import AccountEditForm from "./AccountEditform";

export default function Dashboard({ currentuser, setuser }) {
  const [todos, setTodos] = useState([
    { _id: 1, text: "Learn React", completed: false, subtask: [] },
    { _id: 2, text: "Learn Tailwind CSS", completed: false, subtask: [] },
  ]);
  const [text, setText] = useState(""); // add todo text handler
  const [Todo_id, setTodoid] = useState("");

  console.log(currentuser);
  const [toggleaccountedit, settoggleAccountedit] = useState(false);

  //ensure to load all the todos at the begining of the page render
  useEffect(() => {
    getTodos().then((value) => {
      setTodos((prev) => [...value]);
    });

    return () => {
      // clean up for useffect
      setTodos((prev) => []);
    };
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
    <div className="flex flex-col items-center">
      <Header
        edit={settoggleAccountedit}
        currentuser={currentuser}
        toggleaccountedit={toggleaccountedit}
      />
      {!toggleaccountedit && (
        <div className="  p-4 ">
          <AddTodo
            addTodo={addTodo}
            text={text}
            setText={setText}
            Todo_id={Todo_id}
          />
          <TodoList
            todos={todos}
            toggleTodo={toggleTodo}
            toggleDelete={toggleDelete}
            setTodoid={setTodoid}
            setText={setText}
          />
        </div>
      )}
      {toggleaccountedit && (
        <AccountEditForm setEdit={settoggleAccountedit} setuser={setuser} />
      )}
    </div>
  );
}
