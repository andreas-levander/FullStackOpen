import bcrypt from 'bcrypt';
import express from 'express';
import User from '../models/user.js';

const usersRouter = express.Router();

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title:1, author: 1, url: 1, likes: 1, id: 1 });

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    return response.status(400).json({ error: 'username or password missing'});
  }

  if (username.length < 4 || password.length < 4) {
    return response.status(400).json({ error: 'username and password must be atleast 3 characters long'});
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

export default usersRouter;