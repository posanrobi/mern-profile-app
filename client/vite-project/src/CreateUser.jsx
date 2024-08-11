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
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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
        await createUser(user);
        setName("");
        setAge("");
        setEmail("");
        setGender("");
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2">
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
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
        <Button onClick={handleClick} variant="contained" color="primary">
          Back to users
        </Button>
      </form>
    </Container>
  );
};

export default CreateUser;
