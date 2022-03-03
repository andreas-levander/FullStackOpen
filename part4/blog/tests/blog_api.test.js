import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import Blog from '../models/blog.js';
import * as helper from './test_helper.js'

const api = supertest(app);


beforeEach(async () => {
    await Blog.deleteMany({});

    for (const blog of helper.initialBlogs) {
        let newblog = new Blog(blog);
        await newblog.save();
    }
})

test('correct number of blogs returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
    
})

test('id exists', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
    
})

test('post adds blog correctly', async () => {
  const newBlog = {
    title: "New blog test",
    author: "Blog Maker",
    url: "http://newblog.com",
    likes: 21
  } 
  await api
    .post('/api/blogs')
    .send(newBlog);
  
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    
})

test('blog likes defaults to 0', async () => {
  const newBlog = {
    title: "New blog test with likes missing",
    author: "Blog Maker",
    url: "http://newblog.com",
  } 
  await api
    .post('/api/blogs')
    .send(newBlog);
  
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0); 
})

test('expect code 400 if title and url missing from request', async () => {
  const newBlog = {
    author: "Blog Maker",
    likes: 99
  } 
  const response = await api
    .post('/api/blogs')
    .send(newBlog);
  
  expect(response.status).toEqual(400);
})

afterAll(() => {
  mongoose.connection.close()
})