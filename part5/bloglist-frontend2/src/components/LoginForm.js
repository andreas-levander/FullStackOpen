import { useState } from "react";
import * as loginService from '../services/login';
import { setToken } from "../services/blogs";


const Loginform = ({ setUser, setNotification }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (event) => {
      event.preventDefault()
      
      try {
        const user = await loginService.login({
          username, password,
        })
        setToken(user.token)
        setUser(user)

        window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
        ) 
        setUsername('')
        setPassword('')
    } catch (exception) {
        //setErrorMessage('Wrong credentials')
        setNotification({message: `Wrong credentials`, type: 'error'});
        setTimeout(() => setNotification({message: null}), 5000)
        setTimeout(() => {
          //setErrorMessage(null)
        }, 5000)
      }
      console.log('logging in with', username, password)
    }
    return (
      <form onSubmit={handleLogin}>
      <div>
      <h2>Login to the application</h2>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
      </form>
    )
}

export default Loginform