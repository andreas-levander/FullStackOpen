import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";
import { useRef } from "react";

const Blogs = ({blogs, user, setUser, setBlogs, setNotification}) => {
    const handlelogout = () => {
      console.log('logout');
      window.localStorage.removeItem('loggedBlogappUser');
      setUser(null);
    }
    const createBlogRef = useRef();

    return (
      <div>
        <h2>blogs</h2>
        logged in as {user.name}
        <button onClick={handlelogout}>logout</button>
        <Togglable buttonLabelShow={'New blog'} buttonLabelHide={"cancel"} ref={createBlogRef}>
          <CreateBlog setBlogs={setBlogs} blogs={blogs} setNotification={setNotification} toggleref={createBlogRef}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        
      </div>
    )
}

export default Blogs