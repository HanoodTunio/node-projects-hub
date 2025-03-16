import React, { useEffect, useState } from "react";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingStudent) {
      await updateStudent(editingStudent.id, newStudent);
      setEditingStudent(null);
    } else {
      await addStudent(newStudent);
    }
    setNewStudent({ name: "", email: "", age: "" });
    fetchStudents();
  };

  const handleEdit = (student) => {
    setNewStudent(student);
    setEditingStudent(student);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchStudents();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Student Management</h2>

      <StudentForm
        newStudent={newStudent}
        setNewStudent={setNewStudent}
        handleSubmit={handleSubmit}
        editingStudent={editingStudent}
      />

      <StudentList
        students={students}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
