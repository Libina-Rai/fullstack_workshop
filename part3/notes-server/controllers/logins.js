const bcrypt = require("bcrypt");
const User = require("../model/user");
const loginsRouter = require("express").Router();
const jwt = require("jsonwebtoken");

loginsRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  if(!user){
    return response.status(401).json({error: "invalid username"});
  }
  
  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  if(!passwordCorrect){
    return response.status(401).json({error: "Invalid password"});
  }

  const userForToken ={
    username: user.username,
    id: user.id
  }
  const token = jwt.sign(userForToken, process.env.SECRET);
  response.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginsRouter;
