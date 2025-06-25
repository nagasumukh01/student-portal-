import React from 'react';
import { FaUser, FaBook, FaCalendarAlt, FaLayerGroup } from 'react-icons/fa';
import './ProfileCard.css';

const ProfileCard = ({ student }) => (
  <div className="profile-card animate__animated animate__fadeInUp">
    <div className="profile-avatar">
      <FaUser size={48} />
    </div>
    <div className="profile-info">
      <h2>{student.name}</h2>
      <div className="profile-details">
        <span><FaBook /> {student.branch}</span>
        <span><FaLayerGroup /> Sem {student.semester}</span>
        <span><FaCalendarAlt /> Year {student.year}</span>
      </div>
    </div>
  </div>
);

export default ProfileCard;
