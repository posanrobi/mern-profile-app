import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchUsers } from "./api";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  const handleClick = () => {
    navigate("/createuser");
  };

  return (
    <>
      <List>
        {users.map((user) => (
          <ListItem
            key={user._id}
            sx={{
              border: "1px solid #000",
              marginBottom: 1,
              padding: 1,
              borderRadius: 3,
            }}
          >
            <ListItemText primary={user.name} secondary={`Age: ${user.age}`} />
            <Typography variant="body2" color="textSecondary">
              Email: {user.email}
            </Typography>
          </ListItem>
        ))}
      </List>
      {users.length === 0 && <Typography>No user</Typography>}
      <Button onClick={handleClick} variant="contained" color="primary">
        Create a new user
      </Button>
    </>
  );
};

export default Users;
