import { useState } from "react";
import * as loginService from "../services/login";
import { setToken } from "../services/blogs";
import PropTypes from "prop-types";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const Loginform = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setToken(user.token);
      setUser(user);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("Wrong credentials", "error", 3));
    }
    console.log("logging in with", username, password);
  };
  return (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Login to the application</h2>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="loginbutton" type="submit">
        login
      </button>
    </form>
  );
};

Loginform.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Loginform;
