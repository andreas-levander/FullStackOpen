import express from 'express';
import Blog from '../models/blog.js';

const blogRouter = express.Router();

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1, id: 1 });
      
    response.json(blogs);
      
  })
  
blogRouter.post('/', async (request, response) => {
    const {author, title, url, likes} = request.body;

    const user = request.user;

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
  const user = request.user;

  const blog = await Blog.findById(request.params.id);

  if (!blog) return response.status(404).json({error: 'bad blog id'});

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'unauthorized user' });
  }

  await Blog.findByIdAndRemove(request.params.id);

  user.blogs = user.blogs.filter(userblog => userblog.toString() !== blog._id.toString());
  await user.save();

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