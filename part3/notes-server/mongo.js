const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// If you want to add a note when running `node mongo.js "your note"`
const content = process.argv[2];

if (content) {
  const note = new Note({
    content,
    important: true,
  });

  note.save().then(() => {
    console.log("note saved!");
    mongoose.connection.close();
  });
} else {
  Note.find({}).then((notes) => {
    notes.forEach((note) => console.log(note));
    mongoose.connection.close();
  });
}
