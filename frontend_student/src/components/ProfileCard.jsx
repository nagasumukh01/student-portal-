import React, { useState } from 'react';
import { FaUser, FaBook, FaCalendarAlt, FaLayerGroup } from 'react-icons/fa';
import './ProfileCard.css';
import StudentDetailsModal from './StudentDetailsModal';

const ProfileCard = ({ student }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <div className="profile-card animate__animated animate__fadeInUp">
        <div className="profile-avatar">
          <FaUser size={48} />
        </div>
        <div className="profile-info">
          <h2 className="profile-clickable" onClick={() => setShowDetails(true)}>{student.name}</h2>
          <div className="profile-details">
            <span className="profile-clickable" onClick={() => setShowDetails(true)}><FaBook /> {student.branch}</span>
            <span className="profile-clickable" onClick={() => setShowDetails(true)}><FaLayerGroup /> Sem {student.semester}</span>
            <span><FaCalendarAlt /> Year {student.academicYear}</span>
          </div>
        </div>
      </div>
      {showDetails && <StudentDetailsModal student={student} onClose={() => setShowDetails(false)} />}
    </>
  );
};

export default ProfileCard;
