const express = require("express");
const cors = require("cors");
const Note = require("./model/note"); // import model
const app = express();

const middleware = require("./utils/middleware");

// --- Middleware ---
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
app.use(middleware.requestLogger);


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
app.use(middleware.unknownEndpoint);

// --- Error handler (last middleware) ---

app.use(middleware.errorHandler);

module.exports = app;