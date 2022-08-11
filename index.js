const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todoRoute = require("./routes/todos");
const currRoute = require("./routes/curriculum.route")
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use("/todos", todoRoute);
app.use("/curriculum", currRoute);

const mongoUri = process.env.MONGODB_URI;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((error) => {
    console.log({ error });
  });

app.listen(process.env.PORT || 3000);
console.log('server up on port', (process.env.PORT || 3000))
