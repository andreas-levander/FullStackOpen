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
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
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
        : <Blogs blogs={blogs} user={user}/>
      }
    </div>
  )
}

const Blogs = ({blogs, user}) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>logged in as {user.name}</p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

export default App