const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to database".green.bold);
  } catch (error) {
    console.log(("Not Connected to database" + error.message).red.bold);
  }
};
