import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Box,
  Fade,
} from "@mui/material";
import { useEffect, useState } from "react";
import { deleteUser, fetchUsers } from "./api";
import { TbTrashXFilled } from "react-icons/tb";
import { RiEdit2Fill } from "react-icons/ri";
import Statistics from "./Statistics";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

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
    setEditingUserId(id);
    setIsEditingUser(true);
  };

  const handleUserCreated = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setIsCreatingUser(false);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
    setIsEditingUser(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-around",
        gap: "2rem",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          background: "#fff",
          padding: "1rem",
          borderRadius: "0.5rem",
          minHeight: "30rem",
          width: "38rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Fade in={isEditingUser || isCreatingUser} unmountOnExit timeout={500}>
          <Box sx={{ position: "absolute" }}>
            {isEditingUser && (
              <EditUser
                setIsEditingUser={setIsEditingUser}
                userId={editingUserId}
                onUserUpdated={handleUserUpdated}
              />
            )}
            {isCreatingUser && (
              <CreateUser
                setIsCreatingUser={setIsCreatingUser}
                onUserCreated={handleUserCreated}
              />
            )}
          </Box>
        </Fade>

        {!isEditingUser && !isCreatingUser && (
          <>
            <List
              sx={{
                maxHeight: "26rem",
                overflow: "auto",
                overflowX: "none",
                padding: "0 1rem 0 1rem",
                display: "grid",
                gridTemplateColumns:
                  users.length === 0 ? "unset" : "repeat(2, 1fr)",
                gap: "1rem",
                alignItems: "start",
              }}
            >
              {users.length === 0 ? (
                <Typography
                  color={"black"}
                  sx={{
                    fontSize: "1.2rem",
                    color: "grey",
                    marginTop: "1rem",
                  }}
                >
                  No user available
                </Typography>
              ) : (
                users.map((user) => (
                  <ListItem
                    key={user._id}
                    sx={{
                      backgroundColor: "#f1f1f1",
                      padding: "0.5rem",
                      borderRadius: 3,
                      width: "18rem",
                      height: "8rem",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <ListItemText
                      primary={`${user.name} (${user.age})`}
                      primaryTypographyProps={{
                        sx: {
                          color: "#000",
                          width: "100%",
                          textAlign: "center",
                        },
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        maxWidth: "15rem",
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        {user.email}
                      </Typography>

                      <Box>
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

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <IconButton
                        onClick={() => handleEditUser(user._id)}
                        sx={{
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
                    </Box>
                  </ListItem>
                ))
              )}
            </List>

            <Button
              onClick={() => setIsCreatingUser(true)}
              variant="contained"
              sx={{
                background: "#585151",
                marginTop: "1rem",
                width: "12rem",
                "&:hover": { background: "#484141" },
              }}
            >
              Create a new user
            </Button>
          </>
        )}
      </Box>

      <Statistics />
    </Container>
  );
};

export default Dashboard;
