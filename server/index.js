const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const userRouter = require("./routes/users");
app.use("/api/users", userRouter);

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Mongo connected"))
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
};

connectDB();

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
