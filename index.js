const express = require("express");
const userRouter = require("./routes/userRoutes");
const notesRouter = require("./routes/noteRoutes")
const dotenv = require("dotenv");
const mongoose = require("mongoose")
dotenv.config({path: "./config.env"})


const app = express();
const port = 3000;

const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD)

mongoose.connect(DB).then( con => {
  console.log('db connected');
})

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/notes", notesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
