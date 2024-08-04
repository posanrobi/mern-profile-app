import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchUsers } from "./api";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  return (
    <>
      <List>
        {users.map((user) => (
          <ListItem key={user._id}>
            <ListItemText primary={user.name} secondary={`Age: ${user.age}`} />
            <Typography variant="body2" color="textSecondary">
              Email: {user.email}
            </Typography>
          </ListItem>
        ))}
      </List>
      {users.length === 0 && <Typography>No user</Typography>}
    </>
  );
};

export default Users;
