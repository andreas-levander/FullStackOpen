import React, { useState } from "react";
import { useSelector } from "react-redux";

const Blog = ({ blog, handleLikesClick, handleRemoveBlog }) => {
  const [visible, setVisible] = useState(false);
  const [buttontext, setButtonText] = useState("show");
  const user = useSelector((state) => state.user);

  const toggleVisibility = () => {
    setVisible(!visible);
    setButtonText(visible ? "show" : "hide");
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blogdiv">
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} id="toggle-blog">
        {buttontext}
      </button>
      {visible ? (
        <div className="togglableBlogContent">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button id="likebutton" onClick={() => handleLikesClick(blog)}>
              like
            </button>
          </div>
          {blog && user && blog.user.username === user.username ? (
            <button
              onClick={() => handleRemoveBlog(blog)}
              id="remove-blog-button"
            >
              remove
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
