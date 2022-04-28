import { useState } from "react";
import * as loginService from '../services/login';
import { setToken } from "../services/blogs";


const Loginform = ({ setUser }) => {
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
        console.log(user)
        setUsername('')
        setPassword('')
      } catch (exception) {
        //setErrorMessage('Wrong credentials')
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