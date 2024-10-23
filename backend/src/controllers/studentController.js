const fs = require("fs");
const path = require("path");

// Path to the students.json file
const filePath = path.join(__dirname, "../data/students.json");

// Helper function to read the JSON file
const readData = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Helper function to write to the JSON file
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

// Get all students
exports.getAllStudents = (req, res) => {
  const students = readData();
  res.json(students);
};

// Add a new student
exports.addStudent = (req, res) => {
  const students = readData();
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  writeData(students);
  res.status(201).json(newStudent);
};

// Update a student
exports.updateStudent = (req, res) => {
  const students = readData();
  const studentIndex = students.findIndex(
    (student) => student.id == req.params.id
  );

  if (studentIndex !== -1) {
    students[studentIndex] = { id: req.params.id, ...req.body };
    writeData(students);
    res.json(students[studentIndex]);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
};

// Delete a student
exports.deleteStudent = (req, res) => {
  const students = readData();
  const updatedStudents = students.filter(
    (student) => student.id != req.params.id
  );

  if (students.length === updatedStudents.length) {
    res.status(404).json({ message: "Student not found" });
  } else {
    writeData(updatedStudents);
    res.status(200).json({ message: "Student deleted successfully" });
  }
};
