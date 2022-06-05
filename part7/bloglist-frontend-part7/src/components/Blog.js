import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as blogService from "../services/blogs";
import { likeBlog, deleteBlog } from "../reducers/blogsReducer";

const Blog = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs).find(
    (blog) => blog.id === id
  );

  const handleLikesClick = async (blog) => {
    try {
      const updatedBlog = await blogService.updateBlog({
        ...blog,
        likes: blog.likes + 1,
      });
      dispatch(likeBlog(updatedBlog));
    } catch {
      console.log("error updating likes");
    }
  };

  const handleRemoveBlog = async (blog) => {
    if (window.confirm(`Do you with to delete ${blog.title}?`)) {
      try {
        await blogService.removeBlog(blog);
        dispatch(deleteBlog(blog));
      } catch {
        console.log("error removing blog");
      }
    }
  };

  return (
    <div className="blogdiv">
      <h1>
        {blog.title} {blog.author}
      </h1>

      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button id="likebutton" onClick={() => handleLikesClick(blog)}>
          like
        </button>
      </div>
      {blog.user.username !== user.username && (
        <div>created by {blog.user.name}</div>
      )}
      {blog && user && blog.user.username === user.username ? (
        <button onClick={() => handleRemoveBlog(blog)} id="remove-blog-button">
          remove
        </button>
      ) : null}
    </div>
  );
};

export default Blog;
