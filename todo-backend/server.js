const express = require("express");
const path = require("path");
const connectDB = require("./utils/db");
const auth = require("./routes/auth");
const todos = require("./routes/todos");
require("dotenv").config();

var cors = require("cors");

const app = express();

//Connect DB
connectDB();

//Init Middleware
//app.use(express.json({ extended: false }));
const bodyParser = require("body-parser");
app.use(bodyParser.json({ extended: false }));

app.use(cors());

//routes
app.use(auth);
app.use(todos);

//defining fallback page
app.get("*", (req, res) => {
  // console.log(res);
  res.send("<h1 style= 'text-align: center;'> 404 Page Not Found </h1>");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
