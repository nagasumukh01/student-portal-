import React from 'react';
import { FaUserGraduate } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = ({ name, theme, toggleTheme }) => (
  <header className="portal-header animate__animated animate__fadeInDown">
    <div className="header-left">
      <FaUserGraduate className="header-icon" />
      <span className="header-title">Student Portal</span>
    </div>
    <div className="header-center">
      <span className="header-welcome">Welcome back, <b>{name}</b>!</span>
    </div>
    <div className="header-right">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </div>
  </header>
);

export default Header;
