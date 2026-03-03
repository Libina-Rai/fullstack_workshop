const Note = require("../model/note");
const notesRouter = require("express").Router();

// GET all notes
notesRouter.get("/", async (request, response, next) => {
  try {
    const result = await Note.find({});
    response.json(result);
  } catch (error) {
    next(error);
  }
});

// GET single note
notesRouter.get("/:noteid", async (request, response, next) => {
  try {
    const result = await Note.findById(request.params.noteid);

    if (result) {
      response.json(result);
    } else {
      response.status(404).send(`No note found at id ${request.params.noteid}`);
    }
  } catch (error) {
    next(error);
  }
});

// UPDATE note
notesRouter.put("/:id", async (request, response, next) => {
  try {
    const body = request.body;

    const note = {
      content: body.content,
      important: body.important,
    };

    const updatedNote = await Note.findByIdAndUpdate(
      request.params.id,
      note,
      { new: true, runValidators: true }
    );

    response.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

// DELETE note
notesRouter.delete("/:noteid", async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.noteid);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

// CREATE note
notesRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    if (!body.content) {
      return response.status(400).json({ error: "content missing" });
    }

    const note = new Note({
      content: body.content,
      important: body.important || false,
    });

    const savedNote = await note.save();
    response.json(savedNote);
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;