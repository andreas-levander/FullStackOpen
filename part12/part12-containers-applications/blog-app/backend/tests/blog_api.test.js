import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import Blog from '../models/blog.js';
import User from '../models/user.js';
import * as helper from './test_helper.js'

const api = supertest(app);

const login = async () => {
  const res = await api.post('/api/login').send({
    "username":"testuser",
    "password":"password"
  })
  return res.body.token;
}

beforeEach(async () => {
    await Blog.deleteMany({});

    await User.deleteMany({});

    await api.post('/api/users').send({
        "username":"testuser",
        "name":"User for Testing",
        "password":"password"
    })
    const token = await login();
    for (const blog of helper.initialBlogs) {
      await api
        .post('/api/blogs')
        .set('Authorization',`bearer ${token}`)
        .send(blog);
  }
})

test('correct number of blogs returned', async () => {
  const token = await login();

  const response = await api
    .get('/api/blogs')
    .set('Authorization',`bearer ${token}`);


  expect(response.body).toHaveLength(helper.initialBlogs.length);
    
})

test('id exists', async () => {
  const token = await login();
  const response = await api
    .get('/api/blogs')
    .set('Authorization',`bearer ${token}`);

  expect(response.body[0].id).toBeDefined();
    
})

test('post adds blog correctly', async () => {
  const token = await login();
  const newBlog = {
    title: "New blog test",
    author: "Blog Maker",
    url: "http://newblog.com",
    likes: 21
  } 
  await api
    .post('/api/blogs')
    .set('Authorization',`bearer ${token}`)
    .send(newBlog);
  
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    
})

test('post doesn\'t add blog if no auth', async () => {
  const newBlog = {
    title: "New blog test",
    author: "Blog Maker",
    url: "http://newblog.com",
    likes: 21
  } 
  const response = await api
    .post('/api/blogs')
    .send(newBlog);
  
    expect(response.status).toEqual(401);
    
})

test('blog likes defaults to 0', async () => {
  const token = await login();
  const newBlog = {
    title: "New blog test with likes missing",
    author: "Blog Maker",
    url: "http://newblog.com",
  } 
  await api
    .post('/api/blogs')
    .set('Authorization',`bearer ${token}`)
    .send(newBlog);
  
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0); 
})

test('expect code 400 if title and url missing from request', async () => {
  const token = await login();
  const newBlog = {
    author: "Blog Maker",
    likes: 99
  } 
  const response = await api
    .post('/api/blogs')
    .set('Authorization',`bearer ${token}`)
    .send(newBlog);
  
  expect(response.status).toEqual(400);
})

test('delete removes the resource', async () => {
  const token = await login();
  const blogs = await helper.blogsInDb();
  const firstblog = blogs[0];

  await api
    .delete(`/api/blogs/${firstblog.id}`)
    .set('Authorization',`bearer ${token}`);
  
  const blogsafter = await helper.blogsInDb();
  
  expect(blogsafter).not.toContainEqual(firstblog);
})

test('set updates the resource', async () => {
  const token = await login();
  const blogs = await helper.blogsInDb();
  const firstblog = blogs[0];

  const updatedblog = {likes:99}

  await api
    .put(`/api/blogs/${firstblog.id}`)
    .set('Authorization',`bearer ${token}`)
    .send(updatedblog);
  
  const blogsafter = await helper.blogsInDb();
  
  expect(blogsafter[0].likes).toEqual(99);
})

afterAll(() => {
  mongoose.connection.close()
})