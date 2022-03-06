import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import * as helper from './test_helper.js';
import User from '../models/user.js';

const api = supertest(app);


beforeEach(async () => {
    await User.deleteMany({});

    /* for (const blog of helper.initialBlogs) {
        let newblog = new Blog(blog);
        await newblog.save();
    } */
})

test('can\'t add invalid users (username or password missing)', async () => {
    const usersBefore = await helper.usersInDb();

    const response = await api.post('/api/users').send({name:'test'});

    const usersAfter = await helper.usersInDb();
  
    expect(response.body.error).toBe('username or password missing');
    expect(usersAfter.length).toBe(usersBefore.length);
      
})

test('can\'t users with invalid username or password (<4 chars)', async () => {
    const usersBefore = await helper.usersInDb();

    const response = await api.post('/api/users').send({username:'123', name:'test', password: '123'});

    const usersAfter = await helper.usersInDb();
  
    expect(response.body.error).toBe('username and password must be atleast 3 characters long');
    expect(usersAfter.length).toBe(usersBefore.length);
      
  })

afterAll(() => {
    mongoose.connection.close()
})