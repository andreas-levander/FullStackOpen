import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userService from "../services/users";
import { setUserStats } from "../reducers/userStatsReducer";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userStats);

  useEffect(() => {
    userService.getAll().then((users) => dispatch(setUserStats(users)));
  }, []);

  return (
    <div>
      {console.log(users)}
      <h1>Users</h1>
    </div>
  );
};

export default Users;
