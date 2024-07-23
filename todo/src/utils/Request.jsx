import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

function loadtoken() {
  instance.defaults.headers.common["x-auth-token"] =
    localStorage.getItem("token");
}

//create user account function
export async function createAccount({ email, username, password, security }) {
  let user = { email, username, password, security };

  console.log(user);
  try {
    const response = await instance.post("/user", user);
    console.log(response);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    instance.defaults.headers.common["x-auth-token"] = response.data.token;
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

//login function
export async function login({ email, password }) {
  let user = { email, password };

  try {
    const response = await instance.post("/user-login", user);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    instance.defaults.headers.common["x-auth-token"] = response.data.token;

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getuser() {
  try {
    loadtoken();
    const user = await instance.get("/user");
    return user.data;
  } catch (error) {
    console.log(error);
  }
}

//edit user data function
export async function edituser({ email, password, security, username }) {
  try {
    const response = await instance.put("/user-edit", {
      username,
      email,
      password,
      security,
    });
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {}
}

//delete user function
export async function deleteuser(navigate) {
  var answer = window.confirm("Are You sure want to Delete Your Account?");
  if (!answer) {
    return;
  }

  try {
    loadtoken();
    const response = await instance.delete("/user");
    instance.defaults.headers.common["x-auth-token"] = "";
    localStorage.clear();
    navigate("/");
    return response.status;
  } catch (error) {
    console.log(error);
  }
}

//not using any fancy logic for logout just using the local storage to logout user
export async function logout(navigate) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
}

export async function sendTodo({ text, completed, subtask }) {
  try {
    const response = await instance.post("/todos", {
      text,
      completed,
      subtask,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//function to get todos anywhere in the app for authenticated user
export async function getTodos() {
  try {
    loadtoken();
    const response = await instance.get("/todos");

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function editTodo(todo) {
  try {
    loadtoken();
    const response = await instance.put("/todos", todo);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deletetodo(id) {
  console.log(id);
  try {
    const response = await instance.delete(`/todos/${id}`);

    return response.status;
  } catch (error) {
    console.log(error);
  }
}
