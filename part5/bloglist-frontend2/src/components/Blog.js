import React, {useState} from 'react';

const Blog = ({blog, handleLikesClick, handleRemoveBlog, user}) => {
  const [visible, setVisible] = useState(false);
  const [buttontext, setButtonText] = useState('show');

  const toggleVisibility = () => {
    setVisible(!visible);
    setButtonText(visible ? 'show' : 'hide');
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  

  return (
  <div style={blogStyle}>
    {blog.title}
    <button onClick={toggleVisibility}>{buttontext}</button>
    {visible ? 
    <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={() => handleLikesClick(blog)}>like</button></div>
        <div>{blog.author}</div>
        {blog.user.username === user.username ?
          <button onClick={() => handleRemoveBlog(blog)}>remove</button>
         : null
        }
        
    </div>
    : null
    }
  </div>
  )
}

export default Blog
