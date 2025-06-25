import React, { useEffect, useState } from 'react';
import { fetchStudentsPaged, createStudent, updateStudent, deleteStudent } from './api';
import StudentForm from './components/StudentForm';
import AttendanceTable from './components/AttendanceTable';
import ConfirmDialog from './components/ConfirmDialog';
import './components/StudentListModern.css';

function StudentList({ setNotification }) {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const loadStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchStudentsPaged({ search, page, size });
      setStudents(data.content);
      setTotalPages(data.totalPages);
    } catch (e) {
      setError(e.message || 'Failed to load students');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadStudents();
    // eslint-disable-next-line
  }, [page, size, search]);

  const handleAdd = async (student) => {
    setLoading(true);
    setError('');
    try {
      await createStudent(student);
      setShowForm(false);
      loadStudents();
      setNotification && setNotification({ message: 'Student added!', type: 'success' });
    } catch (e) {
      setError(e.message || 'Failed to add student');
      setNotification && setNotification({ message: 'Failed to add student', type: 'error' });
    }
    setLoading(false);
  };

  const handleEdit = async (student) => {
    setLoading(true);
    setError('');
    try {
      await updateStudent(student.id, student);
      setEditStudent(null);
      loadStudents();
      setNotification && setNotification({ message: 'Student updated!', type: 'success' });
    } catch (e) {
      setError(e.message || 'Failed to update student');
      setNotification && setNotification({ message: 'Failed to update student', type: 'error' });
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    try {
      await deleteStudent(deleteId);
      setDeleteId(null);
      loadStudents();
      setNotification && setNotification({ message: 'Student deleted!', type: 'success' });
    } catch (e) {
      setError(e.message || 'Failed to delete student');
      setNotification && setNotification({ message: 'Failed to delete student', type: 'error' });
    }
    setLoading(false);
  };

  // Helper to order years
  const yearOrder = { '1st': 1, '2nd': 2, '3rd': 3, '4th': 4 };
  const sortedStudents = [...students].sort((a, b) => {
    const yearA = yearOrder[a.academicYear] || 99;
    const yearB = yearOrder[b.academicYear] || 99;
    if (yearA !== yearB) return yearA - yearB;
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
        <input
          className="search-input"
          placeholder="Search by name, email, or branch..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }}
        />
        <button className="add-btn" onClick={() => { setShowForm(true); setEditStudent(null); }}>Add Student</button>
      </div>
      {showForm && (
        <StudentForm
          initial={editStudent}
          onSubmit={editStudent ? handleEdit : handleAdd}
          onCancel={() => { setShowForm(false); setEditStudent(null); }}
          loading={loading}
          error={error}
        />
      )}
      {loading && <div>Loading...</div>}
      {error && <div className="error-msg">{error}</div>}
      <div className="student-list-cards">
        <div className="student-list-table-header">
          <div>Name</div>
          <div>Email</div>
          <div>Branch</div>
          <div>Year</div>
          <div>Semester</div>
          <div>Attendance</div>
          <div>Actions</div>
        </div>
        {sortedStudents.length === 0 && !loading && (
          <div className="student-card-empty">No students found.</div>
        )}
        {sortedStudents.map(s => (
          <div className="student-card" key={s.id}>
            <div className="student-card-info">
              <div className="student-details-card">
                <div className="student-avatar">
                  {s.name?.charAt(0)?.toUpperCase() || '?' }
                </div>
                <div className="student-details-main">
                  <span className="student-name">{s.name}</span>
                  <div className="student-email">{s.email}</div>
                  <div className="student-badges-group">
                    <span className="student-badge branch">{s.branch}</span>
                    <span className="student-badge year">{s.academicYear}</span>
                    <span className="student-badge semester">Sem {s.semester}</span>
                  </div>
                </div>
              </div>
              <div>
                <AttendanceTable attendance={s.attendance} />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
                  <button
                    className="edit-btn subject-edit-btn"
                    onClick={() => { setEditStudent(s); setShowForm(true); }}
                    title="Edit"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
            <div className="student-card-actions">
              <button className="delete-btn" onClick={() => setDeleteId(s.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>Prev</button>
        <span> Page {page + 1} of {totalPages || 1} </span>
        <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>Next</button>
      </div>
      <ConfirmDialog
        open={!!deleteId}
        message="Are you sure you want to delete this student?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

export default StudentList;
