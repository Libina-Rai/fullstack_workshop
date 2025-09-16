const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const notesRouter = require("./controllers/notes");
const config = require("./utils/config");

// --- Middleware ---
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

mongoose.connect(config.MONGODB_URI)
  .then(( ) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);

// --- Unknown endpoint handler ---
app.use(middleware.unknownEndpoint);

// --- Error handler (last middleware) ---

app.use(middleware.errorHandler);

module.exports = app;