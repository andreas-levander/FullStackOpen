import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../reducers/userReducer";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handlelogout = () => {
    console.log("logout");
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setUser(null));
  };

  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      logged in as {user.name}
      <button onClick={handlelogout}>logout</button>
    </div>
  );
};

export default NavBar;
