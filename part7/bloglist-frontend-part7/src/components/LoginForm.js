import { useState } from "react";
import * as loginService from "../services/login";
import { setToken } from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

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
    <Form onSubmit={handleLogin}>
      <h2>Login to the application</h2>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />

        <Form.Label>password</Form.Label>
        <Form.Control
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />

        <Button variant="primary" id="Button" type="submit">
          login
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Loginform;
