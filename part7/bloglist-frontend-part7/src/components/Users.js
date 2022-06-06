import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userService from "../services/users";
import { setUserStats } from "../reducers/userStatsReducer";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userStats);

  useEffect(() => {
    userService.getAll().then((users) => dispatch(setUserStats(users)));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <Table striped>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>
                <Link to={user.username}>{user.name}</Link>
              </td>
              <td>{user.created}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
