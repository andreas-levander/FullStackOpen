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
    console.log("lel");
    const blog = new Blog(body);
  
    const savednote = await blog.save();
      
    response.status(201).json(savednote);
      
})


export default blogRouter;