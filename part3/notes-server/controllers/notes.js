const Note = require("../model/note"); // import model
const notesRouter = require("express").Router();

notesRouter.get("/", (request, response) => {
  Note.find({}).then((result) => {
    response.json(result);
  });
});

notesRouter.get("/:noteid", (request, response, next) => {
  Note.findById(request.params.noteid)
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).send(`No note found at id ${request.params.id}`);
      }
    })
    .catch((error) => next(error));
});

notesRouter.put("/:id", (request, response, next) => {
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

notesRouter.delete("/:noteid", (request, response, next) => {
  Note.findByIdAndRemove(request.params.noteid)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

notesRouter.post("/", (request, response, next) => {
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

module.exports = notesRouter;