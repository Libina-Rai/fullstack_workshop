const router = require('express').Router();
const Note = require('../model/note');
const User = require('../model/user');

router.post('/reset', async (req, res) => {
  console.log('RESET CALLED');
  await Note.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
});

module.exports = router;