import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const { username } = useParams();
  const userStats = useSelector((state) => state.userStats);
  const current = userStats.find((user) => user.username === username);

  if (!current) return null;

  return (
    <div>
      <h1>{current.name}</h1>
      <p>added blogs</p>
      <ListGroup as="ul">
        {current.blogs.map((blog) => (
          <ListGroup.Item as="li" key={blog.id}>
            {blog.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default User;
