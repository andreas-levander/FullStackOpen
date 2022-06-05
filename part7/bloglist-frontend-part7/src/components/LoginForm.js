import { useState } from "react";
import * as loginService from "../services/login";
import { setToken } from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const Loginform = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setToken(user.token);
      dispatch(setUser(user));

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      navigate("/");
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

export default Loginform;
