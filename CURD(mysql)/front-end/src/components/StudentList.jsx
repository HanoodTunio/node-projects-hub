import React from "react";
import StudentItem from "./StudentItem";

const StudentList = ({ students, handleEdit, handleDelete }) => {
  return (
    <div className="card shadow p-4">
      <h3 className="mb-3">Students List</h3>
      <ul className="list-group">
        {students.length > 0 ? (
          students.map((student) => (
            <StudentItem
              key={student.id}
              student={student}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-center text-muted">No students found</p>
        )}
      </ul>
    </div>
  );
};

export default StudentList;
