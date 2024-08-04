import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { createUser } from "./api";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { name, age: parseInt(age), email };

    try {
      await createUser(user);
      setName("");
      setAge("");
      setEmail("");
    } catch (error) {
      console.error("Error creating user:", error.response.data);
    }
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
      </form>
    </>
  );
};

export default CreateUser;
