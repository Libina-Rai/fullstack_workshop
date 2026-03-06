const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/logins");
const config = require("./utils/config");

// --- Middleware ---
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

console.log("the port is", process.env.PORT);
console.log("the environment is", process.env.NODE_ENV);

mongoose.connect(config.MONGODB_URI)
  .then(( ) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

// --- Unknown endpoint handler ---
app.use(middleware.unknownEndpoint);

// --- Error handler (last middleware) ---

app.use(middleware.errorHandler);

module.exports = app;