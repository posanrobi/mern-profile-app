import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { createUser } from "./api";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { name, age: parseInt(age), email };

    try {
      await createUser(user);
      setName("");
      setAge("");
      setEmail("");
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
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
        />
        <TextField
          label="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
        <Button onClick={handleClick} variant="contained" color="primary">
          Back to users
        </Button>
      </form>
    </>
  );
};

export default CreateUser;
