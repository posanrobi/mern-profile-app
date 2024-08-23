import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  Box,
  Container,
} from "@mui/material";
import { useState } from "react";
import { createUser } from "./api";
import PropTypes from "prop-types";

const CreateUser = ({ setIsCreatingUser, onUserCreated }) => {
  CreateUser.propTypes = {
    setIsCreatingUser: PropTypes.func.isRequired,
    onUserCreated: PropTypes.func.isRequired,
  };

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    if (!name) tempErrors.name = "Name is required";
    if (!age) tempErrors.age = "Age is required";
    if (!email) tempErrors.email = "Email is required";
    if (!gender) tempErrors.gender = "Gender is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { name, age: parseInt(age), email, gender };

    try {
      if (validate()) {
        const createdUser = await createUser(user);
        onUserCreated(createdUser);
        setName("");
        setAge("");
        setEmail("");
        setGender("");
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ background: "white", padding: "1rem", borderRadius: "0.5rem" }}
    >
      <Typography variant="h4" component="h2" color="black">
        Create User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
        <FormControl component="fieldset" error={!!errors.gender} fullWidth>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              color: "black",
            }}
          >
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              row
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </Box>
        </FormControl>
        <TextField
          label="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.age}
          helperText={errors.age}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <Box sx={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ background: "#585151", "&:hover": { background: "#484141" } }}
          >
            Create
          </Button>
          <Button
            onClick={() => setIsCreatingUser(false)}
            variant="contained"
            sx={{ background: "#585151", "&:hover": { background: "#484141" } }}
          >
            Back to users
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CreateUser;
