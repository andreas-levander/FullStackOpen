import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";
import { useRef } from "react";
import { createBlog, getAll } from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../reducers/blogsReducer";
import { Routes, Route, Link } from "react-router-dom";
import Users from "./Users";
import NavBar from "./NavBar";
import User from "./User";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const createBlogRef = useRef();

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <div>
        <NavBar />
        <h2>blogs</h2>
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
                    <div style={blogStyle} key={blog.id}>
                      <Link key={blog.id} to={`blogs/${blog.id}`}>
                        {blog.title} {blog.author}
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:username" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default Blogs;
