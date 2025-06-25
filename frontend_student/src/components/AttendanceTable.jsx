import React from 'react';
import { FaBookOpen } from 'react-icons/fa';
import './AttendanceTable.css';

const getBadgeClass = (percent) => {
  if (percent >= 90) return 'badge-green';
  if (percent >= 80) return 'badge-yellow';
  return 'badge-red';
};

function AttendanceTable({ attendance }) {
  if (!attendance || Object.keys(attendance).length === 0) return <div>No attendance data.</div>;
  const subjects = Object.entries(attendance);
  const totalAttended = subjects.reduce((sum, [_, rec]) => sum + (rec.attended || 0), 0);
  const totalClasses = subjects.reduce((sum, [_, rec]) => sum + (rec.total || 0), 0);
  const overallPercent = totalClasses ? Math.round((totalAttended / totalClasses) * 100) : 0;
  return (
    <div className="attendance-table-wrapper animate__animated animate__fadeIn">
      <table className="attendance-table">
        <thead>
          <tr>
            <th><FaBookOpen style={{marginRight: 4}}/>Subject</th>
            <th>Total</th>
            <th>Attended</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(([subject, record]) => {
            const percent = record.total ? Math.round((record.attended / record.total) * 100) : 0;
            return (
              <tr key={subject}>
                <td>{subject}</td>
                <td>{record.total}</td>
                <td>{record.attended}</td>
                <td>
                  <span className={`attendance-badge ${getBadgeClass(percent)}`}>{percent}%</span>
                  <div className="attendance-progress-bar">
                    <div className={`progress-inner ${getBadgeClass(percent)}`} style={{width: `${percent}%`}}></div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="overall-percentage">Overall Attendance: <b>{overallPercent}%</b></div>
    </div>
  );
}

export default AttendanceTable;
