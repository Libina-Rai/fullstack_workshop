const Note = require("../model/note");
const notesRouter = require("express").Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");

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
const getTokenFrom=(request) => {
  const authorization = request.get("Authorization");
  console.log("authorization is", authorization);
  if(authorization && authorization.startsWith("Bearer ")){
    const token = authorization.replace("Bearer ", "");
    return token;
  }
  return null;
}
notesRouter.post("/", async (request, response, next) => {
  
  try {
    console.log("extracted token:", getTokenFrom(request));
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    console.log("decoded token is", decodedToken);
    const user = await User.findById(decodedToken.id);
    console.log("user is", user);

    if(!user){
      return response.status(401).json({error: "userId is missing or invalid"});
    }
    const body = request.body;

    const note = new Note({
      content: body.content,
      important: body.important || false,
      user: user.id,
    });

    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote.id);
    await user.save();
    response.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;