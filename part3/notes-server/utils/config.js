require("dotenv").config(); // load environment variables from .env file

const PORT = process.env.PORT ? process.env.PORT : 3001; // default to 3001 if PORT is not set
const MONGODB_URI = process.env.MONGODB_URI; // MongoDB connection string

module.exports = { MONGODB_URI, PORT };
