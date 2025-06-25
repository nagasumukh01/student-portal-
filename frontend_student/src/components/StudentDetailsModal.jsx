import React from 'react';
import './StudentDetailsModal.css';

const StudentDetailsModal = ({ student, onClose }) => {
  if (!student) return null;
  return (
    <div className="student-details-modal-overlay" onClick={onClose}>
      <div className="student-details-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>{student.name}</h2>
        <div className="details-list">
          <div><strong>Email:</strong> {student.email}</div>
          <div><strong>Phone:</strong> {student.phone}</div>
          <div><strong>Father Name:</strong> {student.fatherName}</div>
          <div><strong>Mother Name:</strong> {student.motherName}</div>
          <div><strong>City:</strong> {student.city}</div>
          <div><strong>Branch:</strong> {student.branch}</div>
          <div><strong>Year:</strong> {student.academicYear}</div>
          <div><strong>Semester:</strong> {student.semester}</div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;
