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
      date: { type: Date, default: Date.now },
      subtask: [
        {
          task: { type: String },
          completed: { type: Boolean },
        },
      ],
    },
  ],
});

module.exports = Todoschema = mongoose.model("TodoSchema", TodoSchema);
