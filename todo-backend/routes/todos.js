const express = require("express");
const TodoSchema = require("../utils/model");
const Middleware = require("../utils/middleware");
const router = express.Router();

//get all the  todo items
router.get("/todos", Middleware, async (req, res) => {
  const { id } = req.user;

  try {
    if (id === undefined) {
      return res.status(400).json({ msg: "user not found...." });
    }

    const todo_record = await TodoSchema.findById({
      _id: id,
    });

    if (todo_record) {
      return res.status(200).json(todo_record.todos);
    }
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
});

//add todo item
router.post("/todos", Middleware, async (req, res) => {
  const { text, completed, subtask, date } = req.body;
  const { id } = req.user;

  try {
    if (id === undefined) {
      return res.status(400).json({ msg: "user not found...." });
    }

    //if request parameter is empty the response will be 400
    if (
      text === undefined ||
      completed === undefined ||
      subtask === undefined ||
      date === undefined
    ) {
      return res.status(400).json({ msg: "content not found" });
    }

    const todo_record = await TodoSchema.findById({
      _id: id,
    });

    if (todo_record) {
      todo_record.todos.push({ text, completed, subtask, date });
      await todo_record.save();

      return res.status(200).json(todo_record.todos);
    }
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
});

//edit  todo items
router.put("/todos", Middleware, async (req, res) => {
  const { todo_id, text, completed, subtask, date } = req.body;
  const { id } = req.user;

  try {
    if (id === undefined) {
      return res.status(400).json({ msg: "user not found...." });
    }

    if (
      todo_id === undefined ||
      text === undefined ||
      completed === undefined ||
      subtask === undefined ||
      date === undefined
    ) {
      return res.status(400).json({ msg: "content not found" });
    }

    const todo_record = await TodoSchema.findById({
      _id: id,
    });

    if (todo_record) {
      todo_record.todos = todo_record.todos.map((val) =>
        val._id.toString() === todo_id
          ? { _id: todo_id, text, subtask, completed, date }
          : val
      );
      await todo_record.save();

      return res.status(200).json(todo_record.todos);
    }
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
});

//delete todo

router.delete("/todos/:id", Middleware, async (req, res) => {
  const { id } = req.user;
  const todo_id = req.params.id;

  console.log(todo_id);
  try {
    var user = await TodoSchema.findById({ _id: id });
    var todo = user.todos.filter((value) => value._id.toString() === todo_id);

    //returning a error message if there is no todo record in the db
    if (todo.length === 0) {
      //  console.log(user);
      return res.status(400).send({ msg: "Todo not found" });
    }

    if (user) {
      user.todos = user.todos.filter(
        (value) => value._id.toString() !== todo_id
      );

      await user.save();

      return res.status(200).json(user.todos);
    }
  } catch (error) {
    res.status(400).json({ msg: "Server error !!!" });
  }
});

module.exports = router;
