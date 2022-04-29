import Blog from "./Blog";
import CreateBlog from "./CreateBlog";

const Blogs = ({blogs, user, setUser, setBlogs}) => {
    const handlelogout = () => {
      console.log('logout');
      window.localStorage.removeItem('loggedBlogappUser');
      setUser(null);
  
    }
    return (
      <div>
        <h2>blogs</h2>
        <p>logged in as {user.name}</p>
        <button onClick={handlelogout}>logout</button>
        <CreateBlog setBlogs={setBlogs} blogs={blogs}/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
    )
}

export default Blogs