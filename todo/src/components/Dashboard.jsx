import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import { deletetodo, editTodo, getTodos, sendTodo } from "../utils/Request";
import Header from "./Header";
import AccountEditForm from "./AccountEditform";

export default function Dashboard({ currentuser, setuser }) {
  const [todos, setTodos] = useState([
    {
      _id: 1,
      text: "Learn React",
      completed: false,
      subtask: [],
      Date: Date.now,
    },
    {
      _id: 2,
      text: "Learn Tailwind CSS",
      completed: false,
      subtask: [],
      Date: Date.now,
    },
  ]);

  const [text, setText] = useState(""); // add todo text handler
  const [date, setDate] = useState("2024-07-26T00:00");
  const [selectedTodo, setSeclectedTodo] = useState(null);
  const [toggletodoEdit, setToggleEdit] = useState(false);

  const [toggleaccountedit, settoggleAccountedit] = useState(false);

  //ensure to load all the todos and user data at the begining of the page render
  useEffect(() => {
    if (currentuser !== undefined) {
      setuser((prev) => JSON.parse(localStorage.getItem("user")));
    }

    getTodos()
      .then((value) => {
        setTodos((prev) => [...value]);
      })
      .catch((err) => console.log("error in fetching todos", err));

    return () => {
      // clean up for useffect
      setTodos((prev) => []);
    };
  }, []);

  const addTodo = async (todo) => {
    await sendTodo(todo)
      .then((value) => {
        setTodos([...value]);
        console.log("Todo added Response", value);
      })
      .catch((err) => console.log("error in fetching todos", err));
  };

  const toggleTodo = async (id) => {
    let temp = todos.filter((todo) => todo._id.toString() === id);
    if (temp.length > 0) {
      editTodo({
        todo_id: temp[0]._id,
        text: temp[0].text,
        completed: !temp[0].completed,
        subtask: temp[0].subtask,
        date: temp[0].date,
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

  // console.log(todos);
  return (
    <div className="flex flex-col items-center">
      <Header
        edit={settoggleAccountedit}
        currentuser={currentuser}
        toggleaccountedit={toggleaccountedit}
      />
      {!toggleaccountedit && (
        <div className="  p-4   md:w-1/2 lg:w-1/2  ">
          <AddTodo
            addTodo={addTodo}
            text={text}
            setText={setText}
            selectedTodo={selectedTodo}
            setTodos={setTodos}
            setSeclectedTodo={setSeclectedTodo}
            date={date}
            setDate={setDate}
          />
          <TodoList
            todos={todos}
            toggleTodo={toggleTodo}
            toggleDelete={toggleDelete}
            selectedTodo={selectedTodo}
            setSeclectedTodo={setSeclectedTodo}
            setText={setText}
            setDate={setDate}
          />
        </div>
      )}
      {toggleaccountedit && (
        <AccountEditForm setEdit={settoggleAccountedit} setuser={setuser} />
      )}
    </div>
  );
}
