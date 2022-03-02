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

afterAll(() => {
  mongoose.connection.close()
})