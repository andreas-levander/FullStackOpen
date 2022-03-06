import express from 'express';
import Blog from '../models/blog.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { SECRET } from '../utils/config.js';

const blogRouter = express.Router();

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate('users', { username: 1, name: 1, id: 1 });
      
    response.json(blogs);
      
  })
  
blogRouter.post('/', async (request, response) => {
    const {author, title, url, likes} = request.body;

    const decodedToken = jwt.verify(request.token, SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id);

    if (!title && !url) {
      return response.status(400).end();
    }

    const blog = new Blog({
      author,
      title,
      url,
      likes,
      user: user._id
    });
  
    const savedblog = await blog.save();

    user.blogs = user.blogs.concat(savedblog._id);
    await user.save();
      
    response.status(201).json(savedblog);
      
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body;
  const blog = {};

  if(body.author) blog.author = body.author;
  if(body.title) blog.title = body.title;
  if(body.likes) blog.likes = body.likes;
  if(body.url) blog.url = body.url;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });

  response.json(updatedBlog);
})


export default blogRouter;