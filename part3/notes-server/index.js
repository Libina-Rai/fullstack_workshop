const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Note = require("./model/note"); // import model

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("we just wrote this code");
  next();
};

app.use(requestLogger);

// --- Routes ---
app.get("/api/notes", (request, response) => {
  Note.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).send(`No note found at id ${request.params.id}`);
      }
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true, runValidators: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/notes", (request, response, next) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save()
    .then((savedNote) => response.json(savedNote))
    .catch((error) => next(error));
});

// --- Unknown endpoint handler ---
app.use((request, response) => {
  response.status(404).send("No route found to handle this request");
});

// --- Error handler (last middleware) ---
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
