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
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUserById } from "./api";
import { useState, useEffect } from "react";

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    age: "",
    email: "",
    gender: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getUserById(id);
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
  }, [id]);

  const handleClick = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser(id, user);
      navigate("/");
    } catch (err) {
      console.error("Error while updating user: ", err.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <>
      <Typography variant="h4">Edit User</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
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
        <FormControl fullWidth>
          <RadioGroup
            value={user.gender}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
          >
            <FormLabel component="legend">Gender</FormLabel>
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
        </FormControl>
        <Button type="submit" variant="contained">
          Save
        </Button>
        <Button onClick={handleClick} variant="contained">
          Back
        </Button>
      </form>
    </>
  );
};

export default EditUser;
