import express from 'express';
import Blog from '../models/blog.js';

const blogRouter = express.Router();

blogRouter.get('/', (request, response) => {
    const blogs = await Blog.find({});
      
    response.json(blogs);
      
  })
  
blogRouter.post('/', (request, response) => {

    const blog = new Blog(request.body);
  
    const savednote = await blog.save();
      
    response.status(201).json(savednote);
      
})


export default blogRouter;