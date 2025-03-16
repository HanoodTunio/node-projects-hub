import React from "react";

const StudentForm = ({
  newStudent,
  setNewStudent,
  handleSubmit,
  editingStudent,
}) => {
  return (
    <div className="card shadow p-4 mb-4">
      <h3 className="mb-3">
        {editingStudent ? "Edit Student" : "Add Student"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter student name"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter student email"
            value={newStudent.email}
            onChange={(e) =>
              setNewStudent({ ...newStudent, email: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter student age"
            value={newStudent.age}
            onChange={(e) =>
              setNewStudent({ ...newStudent, age: e.target.value })
            }
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
