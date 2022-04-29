import { useState } from "react";
import { createBlog } from "../services/blogs";

const CreateBlog = ({blogs, setBlogs}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleCreateBlog = async (event) => {
        event.preventDefault();
        
        try {
        const newblog = {
            title,
            author,
            url
        }
        await createBlog(newblog);
        setTitle('');
        setAuthor('');
        setUrl('');
        setBlogs(blogs.concat(newblog));
        } catch (exception) {
            //setErrorMessage('Wrong credentials')
            setTimeout(() => {
              //setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <form onSubmit={handleCreateBlog}>
        <h2>create new</h2>
        <div>
        title:<input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        </div>
        <div>
        author:<input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        </div>
        <div>
        url:<input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
        </div>
        <button type="submit">create</button>
        
        </form>
    )
}

export default CreateBlog