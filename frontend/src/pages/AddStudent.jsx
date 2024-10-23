import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const AddStudent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/students", { name, age })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding student", error);
      });
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        marginTop: "50px",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Student
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Age"
            variant="outlined"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button variant="contained" color="success" type="submit">
              Add Student
            </Button>
          </Box>
        </Box>
      </form>
      <Box display="flex" justifyContent="space-between" marginTop={3}>
        <IconButton onClick={() => navigate(-1)} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default AddStudent;
