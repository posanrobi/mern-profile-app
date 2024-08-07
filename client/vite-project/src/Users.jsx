import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { deleteUser, fetchUsers } from "./api";
import { useNavigate } from "react-router-dom";
import { TbTrashXFilled } from "react-icons/tb";
import { RiEdit2Fill } from "react-icons/ri";

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

  const handleDeleteUser = async (id) => {
    const prevUsers = [...users];
    const newUsers = users.filter((user) => user._id !== id);
    setUsers(newUsers);

    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Error deleting user: ", error.message);
      setUsers(prevUsers);
    }
  };

  const handleEditUser = (id) => {
    navigate(`/edituser/${id}`);
  };

  return (
    <>
      <Typography variant="h4">Users</Typography>
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
            <IconButton
              onClick={() => handleEditUser(user._id)}
              sx={{
                marginLeft: 10,
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&:focus": {
                  outline: "none",
                },
                "&:active": {
                  boxShadow: "none",
                },
              }}
            >
              <RiEdit2Fill />
            </IconButton>
            <IconButton
              onClick={() => handleDeleteUser(user._id)}
              sx={{
                color: "red",
                "&:hover": {
                  color: "darkred",
                  backgroundColor: "transparent",
                },
                "&:focus": {
                  outline: "none",
                },
                "&:active": {
                  boxShadow: "none",
                },
              }}
            >
              <TbTrashXFilled />
            </IconButton>
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
