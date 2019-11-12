const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
//Create express Server
const app = express();
const port = process.env.PORT || 9999;
// Middleware alow to parse JSON
app.use(cors());
app.use(express.json());

//Database URI
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
//Require router
const exercisesRouter = require("./routes/exercise");
const usersRouter = require("./routes/users");
// When ever someone goes to our root  url we put use /exercises
app.use("/exercises", exercisesRouter);
// When ever someone gose to  /users
app.use("/users", usersRouter);

//Start web server
app.listen(port, () => {
  console.log(`Server is runing on port : ${port}`);
});
