const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const Router = require("./routes");
const multer = require("multer");
require("dotenv").config();
const cors = require("cors");
const compression = require("compression");

app.use(compression());
app.use(
  cors({
    origin: "*",
    methods: ["OPTIONS", "GET", "POST", "DELETE", "PUT"],
    Headers: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/", Router);
try {
  mongoose.connect(process.env.dbURL);
} catch (error) {
  console.log(error);
}
app.get("/", (req, res) => res.send("Hello World!"));
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error + "" || "Internal Server Error" });
});
app.listen(port, () => console.log(`book app listening on port ${port}!`));
