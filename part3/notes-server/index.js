const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model("Note", noteSchema);

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

let notes = [];

app.get("/api/notes", (request, response) => {
  Note.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/api/notes/:id", (request, response) => {
  const myId = request.params.id;
  const myNote = notes.find((note) => note.id === myId);
  if (myNote) {
    response.json(myNote);
  } else {
    response.status(404).send(`Note with id ${myId} not found`);
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const myId = request.params.id;
  notes = notes.filter((note) => note.id !== myId);

  response.status(404).send(`The note at id ${myId} has been deleted`);
});

app.post("/api/notes", (request, response) => {
  const myNewPost = request.body;
  myNewPost.id = notes.length + 1;
  notes.push(myNewPost);
  response.status(201).json(myNewPost);

  //   const note = new Note({
  //   content: 'HTML is easy',
  //   important: true,
  // })

  // note.save().then(result => {
  //   console.log('note saved!')
  //   mongoose.connection.close()
  // })
});

app.use((request, response, next) => {
  response.status(404).send("no code available to handle this request");
});


app.listen(process.env.PORT);
console.log(`Server running on port ${process.env.PORT}`);
