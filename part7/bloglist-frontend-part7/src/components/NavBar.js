import { Link } from "react-router-dom";

const NavBar = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
    </div>
  );
};

export default NavBar;
