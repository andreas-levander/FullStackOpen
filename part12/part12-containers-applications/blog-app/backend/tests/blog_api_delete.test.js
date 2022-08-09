import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import Blog from '../models/blog.js';
import User from '../models/user.js';
import * as helper from './test_helper.js'

const api = supertest(app);


beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    await api.post('/api/users').send({
        "username":"testuser",
        "name":"User for Testing",
        "password":"password"
    })
})


test('can delete blog if right user', async () => {
    const response = await api.post('/api/login').send({
        "username":"testuser",
        "password":"password"
    })

    const createblog = await api
        .post('/api/blogs')
        .set('Authorization',`bearer ${response.body.token}`)
        .send(
        {
            "title": "testblog",
            "author": "testuser",
            "url": "/test",
            "likes": "1337"
        }
    )
    
    const blogsinDB = await helper.blogsInDb();

    expect(blogsinDB.length).toEqual(1);

    const deleteblog = await api
        .delete(`/api/blogs/${createblog.body.id}`)
        .set('Authorization',`bearer ${response.body.token}`);

    const blogsinDB2 = await helper.blogsInDb();
    const usersinDB = await helper.usersInDb();
    console.log(usersinDB);

    expect(blogsinDB2.length).toEqual(0);
    expect(usersinDB[0].blogs.length).toEqual(0);
      
})

test('can\'t delete blog if wrong user', async () => {
    const response = await api.post('/api/login').send({
        "username":"testuser",
        "password":"password"
    })

    const createblog = await api
        .post('/api/blogs')
        .set('Authorization',`bearer ${response.body.token}`)
        .send(
        {
            "title": "testblog",
            "author": "testuser",
            "url": "/test",
            "likes": "1337"
        }
    )
    
    const blogsinDB = await helper.blogsInDb();

    expect(blogsinDB.length).toEqual(1);

    const deleteblog = await api
        .delete(`/api/blogs/${createblog.body.id}`)
        .set('Authorization',`bearer wrongtoken12323`);

    const blogsinDB2 = await helper.blogsInDb();
    const usersinDB = await helper.usersInDb();

    expect(blogsinDB2.length).toEqual(1);
    expect(usersinDB[0].blogs.length).toEqual(1);
      
  })

afterAll(() => {
    mongoose.connection.close()
  })