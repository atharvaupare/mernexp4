const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// CRUD operations
router.get("/", studentController.getAllStudents);
router.post("/", studentController.addStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
