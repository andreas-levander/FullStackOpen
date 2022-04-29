import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import * as blogService from './services/blogs'
import Loginform from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }  
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {user === null 
        ? <Loginform setUser={setUser} />
        : <Blogs blogs={blogs} user={user} setUser={setUser}/>
      }
    </div>
  )
}

const Blogs = ({blogs, user, setUser}) => {
  const handlelogout = () => {
    console.log('logout');
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);

  }
  return (
    <div>
      <h2>blogs</h2>
      <p>logged in as {user.name}</p><button onClick={handlelogout}>logout</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

export default App