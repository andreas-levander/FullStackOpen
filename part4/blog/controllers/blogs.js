import express from 'express';
import Blog from '../models/blog.js';

const blogRouter = express.Router();

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
      
    response.json(blogs);
      
  })
  
blogRouter.post('/', async (request, response) => {
    const body = request.body;

    if (!body.title && !body.url) {
      response.status(400).end();
      return;
    }
    const blog = new Blog(body);
  
    const savednote = await blog.save();
      
    response.status(201).json(savednote);
      
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