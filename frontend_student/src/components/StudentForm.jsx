import React, { useState, useEffect } from 'react';

// Predefined subjects for each branch, year, and semester
const SUBJECTS_BY_BRANCH_YEAR_SEM = {
  CSE: {
    '1st': {
      '1': ['Maths I', 'Physics', 'English', 'C Programming', 'Engineering Drawing'],
      '2': ['Maths II', 'Chemistry', 'Environmental Science', 'Basic Electronics', 'Workshop']
    },
    '2nd': {
      '3': ['Data Structures', 'OOP', 'Discrete Math', 'Digital Logic', 'Economics'],
      '4': ['DBMS', 'OS', 'Computer Networks', 'Probability', 'Management']
    },
    '3rd': {
      '5': ['Algorithms', 'Software Engg', 'Web Tech', 'AI', 'Compiler Design'],
      '6': ['ML', 'Cloud', 'Mobile Computing', 'IoT', 'Elective I']
    },
    '4th': {
      '7': ['Big Data', 'Cyber Security', 'Elective II', 'Project I', 'Seminar'],
      '8': ['Project II', 'Internship', 'Elective III', 'Elective IV', 'Comprehensive Viva']
    }
  },
  ECE: {
    '1st': {
      '1': ['Maths I', 'Physics', 'English', 'Basic Electrical', 'Engineering Drawing'],
      '2': ['Maths II', 'Chemistry', 'Environmental Science', 'Basic Electronics', 'Workshop']
    },
    '2nd': {
      '3': ['Signals', 'Networks', 'Analog Circuits', 'Maths III', 'Economics'],
      '4': ['Digital Circuits', 'Microprocessors', 'Control Systems', 'Probability', 'Management']
    },
    '3rd': {
      '5': ['VLSI', 'DSP', 'Embedded', 'Electromagnetics', 'Elective I'],
      '6': ['Wireless', 'Optical Comm', 'Nano Tech', 'IoT', 'Elective II']
    },
    '4th': {
      '7': ['Project I', 'Seminar', 'Elective III', 'Elective IV', 'Comprehensive Viva'],
      '8': ['Project II', 'Internship', 'Elective V', 'Elective VI', 'Comprehensive Viva']
    }
  }
  // Add more branches as needed
};
const BRANCHES = Object.keys(SUBJECTS_BY_BRANCH_YEAR_SEM);
const YEARS = ['1st', '2nd', '3rd', '4th'];
const SEMS_BY_YEAR = {
  '1st': ['1', '2'],
  '2nd': ['3', '4'],
  '3rd': ['5', '6'],
  '4th': ['7', '8']
};

function getSubjects(branch, year, sem) {
  return (SUBJECTS_BY_BRANCH_YEAR_SEM[branch]?.[year]?.[sem]) || [];
}

function StudentForm({ initial, onSubmit, onCancel, loading, error }) {
  const [form, setForm] = useState(
    initial || { name: '', email: '', phone: '', fatherName: '', motherName: '', city: '', branch: '', academicYear: '', semester: '', attendance: {} }
  );
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (initial) {
      setForm({
        id: initial.id || '', // Ensure id is included when editing
        name: initial.name || '',
        email: initial.email || '',
        phone: initial.phone || '',
        fatherName: initial.fatherName || '',
        motherName: initial.motherName || '',
        city: initial.city || '',
        branch: initial.branch || '',
        academicYear: initial.academicYear || '',
        semester: initial.semester || '',
        attendance: initial.attendance || {}
      });
      setSubjects(Object.keys(initial.attendance || {}));
    } else {
      setForm({ name: '', email: '', phone: '', fatherName: '', motherName: '', city: '', branch: '', academicYear: '', semester: '', attendance: {} });
      setSubjects([]);
    }
  }, [initial]);

  useEffect(() => {
    if (!initial) {
      const subs = getSubjects(form.branch, form.academicYear, form.semester);
      setSubjects(subs);
      setForm(f => ({
        ...f,
        attendance: subs.reduce((a, s) => ({ ...a, [s]: { total: 0, attended: 0 } }), {})
      }));
    }
    // eslint-disable-next-line
  }, [form.branch, form.academicYear, form.semester]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleAttendanceChange = (subject, field, value) => {
    setForm(f => {
      const newValue = Number(value);
      let attended = f.attendance[subject]?.attended || 0;
      let total = f.attendance[subject]?.total || 0;
      if (field === 'attended') attended = newValue;
      if (field === 'total') total = newValue;
      // Clamp attended to not exceed total
      if (attended > total) attended = total;
      return {
        ...f,
        attendance: {
          ...f.attendance,
          [subject]: {
            total,
            attended
          }
        }
      };
    });
  };

  const handleAddSubject = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject]);
      setForm(f => ({
        ...f,
        attendance: {
          ...f.attendance,
          [newSubject]: { total: 0, attended: 0 }
        }
      }));
      setNewSubject('');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFormError('');
    // Validate attendance constraints
    for (const subj of subjects) {
      const { total, attended } = form.attendance[subj] || {};
      if (total === undefined || attended === undefined || total === '' || attended === '') {
        setFormError('Please enter both total and attended classes for all subjects.');
        return;
      }
      if (attended > total) {
        setFormError('Attended classes cannot be greater than total classes for any subject.');
        return;
      }
      if (total < 0 || attended < 0) {
        setFormError('Class numbers cannot be negative.');
        return;
      }
    }
    onSubmit(form); // form now always includes id if editing
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
      <input name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Father Name" required />
      <input name="motherName" value={form.motherName} onChange={handleChange} placeholder="Mother Name" required />
      <input name="city" value={form.city} onChange={handleChange} placeholder="City" required />
      <select name="branch" value={form.branch} onChange={handleChange} required>
        <option value="">Branch</option>
        {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
      </select>
      <select name="academicYear" value={form.academicYear} onChange={handleChange} required>
        <option value="">Year</option>
        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
      <select name="semester" value={form.semester} onChange={handleChange} required>
        <option value="">Semester</option>
        {(SEMS_BY_YEAR[form.academicYear] || []).map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <div className="subject-form">
        <input value={newSubject} onChange={e => setNewSubject(e.target.value)} placeholder="Add Subject" />
        <button type="button" onClick={handleAddSubject}>Add Subject</button>
      </div>
      <div className="attendance-fields">
        {subjects.map(subj => (
          <div key={subj} className="attendance-input">
            <label>{subj}:</label>
            <input type="number" min="0" placeholder="Total" value={form.attendance[subj]?.total || 0} onChange={e => handleAttendanceChange(subj, 'total', e.target.value)} required />
            <input type="number" min="0" max={form.attendance[subj]?.total || 0} placeholder="Attended" value={form.attendance[subj]?.attended || 0} onChange={e => handleAttendanceChange(subj, 'attended', e.target.value)} required />
          </div>
        ))}
      </div>
      {(formError || error) && <div className="error-msg">{formError || error}</div>}
      <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
      <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default StudentForm;
