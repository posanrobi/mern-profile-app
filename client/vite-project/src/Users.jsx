import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { deleteUser, fetchUsers } from "./api";
import { useNavigate } from "react-router-dom";
import { TbTrashXFilled } from "react-icons/tb";
import { RiEdit2Fill } from "react-icons/ri";
import Statistics from "./Statistics";
import CreateUser from "./CreateUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

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
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {isCreatingUser ? (
        <CreateUser setIsCreatingUser={setIsCreatingUser} />
      ) : (
        <Box
          sx={{ background: "#fff", padding: "1rem", borderRadius: "0.5rem" }}
        >
          <Typography variant="h4" color="#000">
            Users
          </Typography>
          <List
            sx={{
              width: "50rem",
            }}
          >
            {users.map((user) => (
              <ListItem
                key={user._id}
                sx={{
                  backgroundColor: "#f1f1f1",
                  marginBottom: 1,
                  padding: 1,
                  borderRadius: 3,
                }}
              >
                <ListItemText
                  primary={user.name}
                  secondary={`Age: ${user.age}`}
                  primaryTypographyProps={{ sx: { color: "#000" } }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: "20rem",
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    {user.email}
                  </Typography>

                  <Box sx={{ width: "7rem", textAlign: "left" }}>
                    <Typography variant="body2" color="textSecondary">
                      Gender:{" "}
                      {user.gender === "male"
                        ? "Male"
                        : user.gender === "female"
                        ? "Female"
                        : "Other"}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={() => handleEditUser(user._id)}
                  sx={{
                    marginLeft: 10,
                    "&:hover": {
                      color: "darkgrey",
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
          <Button
            onClick={() => setIsCreatingUser(true)}
            variant="contained"
            sx={{ background: "#585151", "&:hover": { background: "#484141" } }}
          >
            Create a new user
          </Button>
        </Box>
      )}
      <Statistics />
    </Container>
  );
};

export default Users;
