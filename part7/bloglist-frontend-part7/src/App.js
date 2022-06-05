import React, { useEffect } from "react";
import Blogs from "./components/Blogs";
import * as blogService from "./services/blogs";
import Loginform from "./components/LoginForm";
import Notification from "./components/Notification";
import { setBlogs } from "./reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./reducers/userReducer";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <Notification />
      <Routes>
        <Route path="*" element={user ? <Blogs /> : <Loginform />} />
      </Routes>
    </div>
  );
};

export default App;
