import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  FormControl,
  Box,
  Container,
} from "@mui/material";
import { editUser, getUserById } from "./api";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const EditUser = ({ setIsEditingUser, userId, onUserUpdated }) => {
  EditUser.propTypes = {
    setIsEditingUser: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    onUserUpdated: PropTypes.func.isRequired,
  };

  const [user, setUser] = useState({
    name: "",
    age: "",
    email: "",
    gender: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getUserById(userId);
        if (currentUser) {
          setUser({
            name: currentUser.name,
            age: currentUser.age,
            email: currentUser.email,
            gender: currentUser.gender,
          });
        }
      } catch (error) {
        console.error("Error getting user", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleClick = () => {
    setIsEditingUser(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const editedUser = await editUser(userId, user);
      onUserUpdated(editedUser);
      setIsEditingUser(false);
    } catch (err) {
      console.error("Error while updating user: ", err.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container
      maxWidth="sm"
      sx={{ background: "white", padding: "1rem", borderRadius: "0.5rem" }}
    >
      <Typography variant="h4" color="black">
        Edit User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <FormControl fullWidth>
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              color: "black",
            }}
          >
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              value={user.gender}
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
              row
            >
              <FormControlLabel
                value="male"
                control={<Radio color="primary" />}
                label="Male"
              />
              <FormControlLabel
                value="female"
                control={<Radio color="primary" />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio color="primary" />}
                label="Other"
              />
            </RadioGroup>
          </Box>
        </FormControl>
        <TextField
          label="Age"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.age}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <Box sx={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ background: "#585151", "&:hover": { background: "#484141" } }}
          >
            Save
          </Button>
          <Button
            onClick={handleClick}
            variant="contained"
            sx={{ background: "#585151", "&:hover": { background: "#484141" } }}
          >
            Back
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EditUser;
