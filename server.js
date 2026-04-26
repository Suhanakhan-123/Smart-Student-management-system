const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server chal raha hai");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
mongoose.connect("mongodb+srv://suhanakhan8755_db_user:4oizxHWStOtkiszB@cluster0.axcz7rf.mongodb.net/studentDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);