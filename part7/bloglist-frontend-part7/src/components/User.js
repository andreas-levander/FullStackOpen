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
      <ul>
        {current.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
