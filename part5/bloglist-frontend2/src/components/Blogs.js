import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";
import { useRef } from "react";
import { updateBlog, removeBlog } from "../services/blogs";

const Blogs = ({blogs, user, setUser, setBlogs, setNotification}) => {
    const handlelogout = () => {
      console.log('logout');
      window.localStorage.removeItem('loggedBlogappUser');
      setUser(null);
    }
    const createBlogRef = useRef();

    const handleLikesClick = async (blog) => {
      try {
        const updatedBlog = await updateBlog({...blog, likes: blog.likes + 1});
        setBlogs(blogs.map(blog => (blog.id === updatedBlog.id) ? updatedBlog : blog));
    } catch {
        console.log('error updating likes');
      }
    }

    const handleRemoveBlog = async (blog) => {
      try {
        await removeBlog(blog);
        setBlogs(blogs.filter(blog_in_blogs => (blog_in_blogs.id !== blog.id)));
    } catch {
        console.log('error removing blog');
      }
    }

    return (
      <div>
        <h2>blogs</h2>
        logged in as {user.name}
        <button onClick={handlelogout}>logout</button>
        <Togglable buttonLabelShow={'New blog'} buttonLabelHide={"cancel"} ref={createBlogRef}>
          <CreateBlog setBlogs={setBlogs} blogs={blogs} setNotification={setNotification} toggleref={createBlogRef}/>
        </Togglable>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} handleLikesClick={handleLikesClick} handleRemoveBlog={handleRemoveBlog}/>
        )}
        
      </div>
    )
}

export default Blogs