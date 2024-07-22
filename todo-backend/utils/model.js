const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: "Rajikshank",
  },
  email: {
    type: String,
    required: true,
  },
  security: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  todos: [
    {
      id: { type: Number },
      text: { type: String },
      completed: { type: Boolean, default: false },
      subtask: [
        {
          task: { type: String, default: "This is a subtask" },
          completed: { type: Boolean },
        },
      ],
    },
  ],
});

module.exports = Todoschema = mongoose.model("TodoSchema", TodoSchema);
