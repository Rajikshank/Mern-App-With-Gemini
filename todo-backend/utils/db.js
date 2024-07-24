const { default: mongoose } = require("mongoose");
const mongodb = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI, {});
    console.log("Database Connected....");
  } catch (error) {
    console.log("Data base Connection Failed with error:", error);
  }
};

module.exports = connectDB;
