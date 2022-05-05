import React, { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import * as blogService from './services/blogs'
import Loginform from './components/LoginForm';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({message: null, type: null});

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
      <Notification message={notification.message} type={notification.type}/>
      {user === null 
        ? <Loginform setUser={setUser} setNotification={setNotification}/>
        : <Blogs blogs={blogs} user={user} setUser={setUser} setBlogs={setBlogs} setNotification={setNotification}/>
      }
    </div>
  )
}


export default App