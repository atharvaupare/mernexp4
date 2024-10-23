import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/students")
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching students");
        setLoading(false);
      });
  }, []);

  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost:3001/api/students/${id}`)
      .then(() => {
        setStudents(students.filter((student) => student.id !== id));
      })
      .catch(() => {
        setError("Error deleting student");
      });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box mt={4} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" component="h1" gutterBottom>
        Student List
      </Typography>

      <TableContainer component={Paper} sx={{ maxWidth: "900px", mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Age</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/edit/${student.id}`)}
                    sx={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="success"
        onClick={() => navigate("/add")}
        sx={{ marginTop: "20px" }}
      >
        Add New Student
      </Button>
    </Box>
  );
};

export default StudentList;
