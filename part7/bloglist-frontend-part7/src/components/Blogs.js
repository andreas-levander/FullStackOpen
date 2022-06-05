import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";
import { useRef } from "react";
import { updateBlog, removeBlog, createBlog, getAll } from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs, likeBlog, deleteBlog } from "../reducers/blogsReducer";
import { setUser } from "../reducers/userReducer";
import { Routes, Route } from "react-router-dom";
import Users from "./Users";
import NavBar from "./NavBar";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const handlelogout = () => {
    console.log("logout");
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setUser(null));
  };
  const createBlogRef = useRef();

  const handleLikesClick = async (blog) => {
    try {
      const updatedBlog = await updateBlog({ ...blog, likes: blog.likes + 1 });
      dispatch(likeBlog(updatedBlog));
    } catch {
      console.log("error updating likes");
    }
  };

  const handleRemoveBlog = async (blog) => {
    if (window.confirm(`Do you with to delete ${blog.title}?`)) {
      try {
        await removeBlog(blog);
        dispatch(deleteBlog(blog));
      } catch {
        console.log("error removing blog");
      }
    }
  };

  const handleCreateBlog = async (newblog) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const returnedblog = await createBlog(newblog);

      //setBlogs(blogs.concat(returnedblog));
      //refetching all to get userdata for remove button since we dont have user id in frontend without changing backend
      const getAllBlogs = await getAll();
      dispatch(setBlogs(getAllBlogs));

      dispatch(
        setNotification(`Created new blog: ${newblog.title}`, "create-blog", 3)
      );

      createBlogRef.current.toggleVisibility();
    } catch (exception) {
      dispatch(
        setNotification(
          "Error creating blog maybe wrong credentials",
          "error",
          3
        )
      );
    }
  };

  return (
    <div>
      <div>
        <NavBar />
        <h2>blogs</h2>
        logged in as {user.name}
        <button onClick={handlelogout}>logout</button>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Togglable
                buttonLabelShow={"New blog"}
                buttonLabelHide={"cancel"}
                ref={createBlogRef}
              >
                <CreateBlog handleCreateBlog={handleCreateBlog} />
              </Togglable>
              <div className="bloglist">
                {[...blogs]
                  .sort((a, b) => b.likes - a.likes)
                  .map((blog) => (
                    <Blog
                      key={blog.id}
                      blog={blog}
                      handleLikesClick={handleLikesClick}
                      handleRemoveBlog={handleRemoveBlog}
                    />
                  ))}
              </div>
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default Blogs;
