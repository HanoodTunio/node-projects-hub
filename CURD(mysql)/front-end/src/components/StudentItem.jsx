import React from "react";

const StudentItem = ({ student, handleEdit, handleDelete }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>
        {student.name} - {student.email} - {student.age}
      </span>
      <div>
        <button
          className="btn btn-success btn-sm me-2"
          onClick={() => handleEdit(student)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(student.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default StudentItem;
