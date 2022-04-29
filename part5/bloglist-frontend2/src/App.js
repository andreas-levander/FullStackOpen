import React, { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
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
        : <Blogs blogs={blogs} user={user} setUser={setUser} setBlogs={setBlogs}/>
      }
    </div>
  )
}


export default App