const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const userRoute = require("./routes/useroute");
const authRoute = require("./routes/auth");
const challangeRoute = require("./routes/challanges");
const categoryRoute = require("./routes/category");
const hotchallange = require("./routes/hotchallange")
const { connectDB } = require("./utils/db");

//Basic setup
dotenv.config();
const app = express();
app.use(express.json());

//Database connection
connectDB();

const PORT = process.env.PORT || 5000;

//home route
app.get("/", (req, res) => {
  res.status(200).json({ status: "Success", message: "Working fine" });
});

//Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/challange", challangeRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/hotchallange", hotchallange);

//Error Handling
app.use((error, req, res, next) => {
  const errorMessage = error.message || "Something went wrong";
  const errorStatus = error.status || 500;

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});


app.listen(PORT, () => {
  console.log(`App is running on port http://localhost:${PORT}`.gray.bold);
});
