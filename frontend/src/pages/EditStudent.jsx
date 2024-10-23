import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditStudent = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/students/${id}`)
      .then((response) => {
        setName(response.data.name);
        setAge(response.data.age);
      })
      .catch((error) => {
        console.error("Error fetching student data", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/api/students/${id}`, { name, age })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating student", error);
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
        Edit Student
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
          <Button variant="contained" color="primary" type="submit">
            Update Student
          </Button>
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

export default EditStudent;
