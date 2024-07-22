const { default: mongoose } = require("mongoose");
const mongodb = require("mongoose");

const connectDB = async () => {
  const uri =
    "mongodb+srv://Rajikshan-Todo:1234567890@aima.eesqbdu.mongodb.net/todo-app?retryWrites=true&w=majority&appName=Aima";

  try {
    await mongoose.connect(uri, {});
    console.log("Database Connected....");
  } catch (error) {
    console.log("Data base Connection Failed with error:", error);
  }
};

module.exports = connectDB;
