import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import AttendanceTable from './components/AttendanceTable';
import StudentList from './StudentList';
import NotificationBanner from './components/NotificationBanner';
import Player from 'lottie-react';
import graduationAnim from './assets/graduation-lottie.json';
import 'animate.css';

// Formal SVG logo for NS University
function NSULogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 7}}>
      <rect x="4" y="12" width="40" height="24" rx="8" fill="#1A237E"/>
      <text x="24" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff" fontFamily="serif">NSU</text>
      <rect x="18" y="6" width="12" height="6" rx="2" fill="#BFA14A"/>
      <rect x="22" y="2" width="4" height="4" rx="1" fill="#BFA14A"/>
    </svg>
  );
}

// Formal SVG Graduation Cap Icon
function GraduationCapIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="40" rx="14" ry="4" fill="#f3e7b3"/>
      <path d="M24 8L44 18L24 28L4 18L24 8Z" fill="#1A237E" stroke="#BFA14A" strokeWidth="2"/>
      <rect x="20" y="28" width="8" height="8" rx="2" fill="#BFA14A" stroke="#1A237E" strokeWidth="1.5"/>
      <path d="M24 28V36" stroke="#BFA14A" strokeWidth="2"/>
      <circle cx="24" cy="38" r="2" fill="#BFA14A" stroke="#1A237E" strokeWidth="1"/>
    </svg>
  );
}

function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState({ name: 'Alex', branch: 'CSE', semester: 6, year: 3 });
  const [attendance, setAttendance] = useState({
    Mathematics: { attended: 42, total: 45 },
    Physics: { attended: 38, total: 45 },
    Chemistry: { attended: 40, total: 45 },
    English: { attended: 44, total: 45 }
  });
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const notificationTimeout = useRef();

  // Auto-dismiss notification after 3s
  useEffect(() => {
    if (notification.message) {
      if (notificationTimeout.current) clearTimeout(notificationTimeout.current);
      notificationTimeout.current = setTimeout(() => {
        setNotification({ message: '', type: 'success' });
      }, 3000);
    }
    return () => {
      if (notificationTimeout.current) clearTimeout(notificationTimeout.current);
    };
  }, [notification.message]);

  useEffect(() => {
    // Add mesh gradient canvas if not present
    if (!document.getElementById('mesh-canvas')) {
      const canvas = document.createElement('canvas');
      canvas.id = 'mesh-canvas';
      document.body.appendChild(canvas);
      let ctx = canvas.getContext('2d');
      let w = window.innerWidth, h = window.innerHeight;
      const resize = () => {
        w = window.innerWidth; h = window.innerHeight;
        canvas.width = w; canvas.height = h;
      };
      resize();
      window.addEventListener('resize', resize);
      // Mesh points
      let points = [];
      let meshRows = 6, meshCols = 8;
      for (let y = 0; y < meshRows; y++) {
        for (let x = 0; x < meshCols; x++) {
          points.push({
            x: (x / (meshCols - 1)) * w,
            y: (y / (meshRows - 1)) * h,
            ox: (x / (meshCols - 1)) * w,
            oy: (y / (meshRows - 1)) * h,
            dx: (Math.random() - 0.5) * 0.7,
            dy: (Math.random() - 0.5) * 0.7,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
      let running = true;
      function animateMesh(t) {
        if (!running) return;
        ctx.clearRect(0, 0, w, h);
        // Animate points
        for (let p of points) {
          p.x = p.ox + Math.sin(t/1200 + p.phase) * 32;
          p.y = p.oy + Math.cos(t/1400 + p.phase) * 32;
        }
        // Draw mesh triangles
        for (let y = 0; y < meshRows - 1; y++) {
          for (let x = 0; x < meshCols - 1; x++) {
            let i = y * meshCols + x;
            let p1 = points[i];
            let p2 = points[i+1];
            let p3 = points[i+meshCols];
            let p4 = points[i+meshCols+1];
            // Neon mesh gradient
            let grad = ctx.createLinearGradient(p1.x, p1.y, p4.x, p4.y);
            grad.addColorStop(0, '#00fff7');
            grad.addColorStop(0.5, '#1a237e');
            grad.addColorStop(1, '#bfa14a');
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p4.x, p4.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.closePath();
            ctx.fillStyle = grad;
            ctx.globalAlpha = 0.13;
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
        requestAnimationFrame(animateMesh);
      }
      animateMesh(0);
      // Clean up
      return () => {
        running = false;
        window.removeEventListener('resize', resize);
        if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
      };
    }
    // Add glassmorphism overlay if not present
    if (!document.querySelector('.bg-glass')) {
      const glass = document.createElement('div');
      glass.className = 'bg-glass';
      document.body.appendChild(glass);
    }
    // Add modern floating background shapes
    const shapes = [
      { className: 'bg-shape shape1' },
      { className: 'bg-shape shape2' }
    ];
    shapes.forEach(({ className }) => {
      if (!document.querySelector('.' + className.replace(/ /g, '.'))) {
        const div = document.createElement('div');
        div.className = className;
        document.body.appendChild(div);
      }
    });
    // Modern cursor halo effect
    let halo = document.createElement('div');
    halo.className = 'cursor-halo';
    document.body.appendChild(halo);
    const moveHalo = (e) => {
      halo.style.left = e.clientX + 'px';
      halo.style.top = e.clientY + 'px';
    };
    window.addEventListener('mousemove', moveHalo);
    // Clean up
    return () => {
      window.removeEventListener('mousemove', moveHalo);
      if (halo && halo.parentNode) halo.parentNode.removeChild(halo);
      document.querySelectorAll('.bg-shape').forEach(el => el.remove());
      const glass = document.querySelector('.bg-glass');
      if (glass && glass.parentNode) glass.parentNode.removeChild(glass);
      const mesh = document.getElementById('mesh-canvas');
      if (mesh && mesh.parentNode) mesh.parentNode.removeChild(mesh);
    };
  }, []);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className={`app-container ${theme}`}>
      <div role="status" aria-live="polite">
        <NotificationBanner message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: 'success' })} />
      </div>
      <Header name={user.name} theme={theme} toggleTheme={toggleTheme} />
      {/* Lottie Graduation Animation in header area for extra polish */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 8, marginBottom: -16 }}>
        <Player
          autoplay
          loop
          src={graduationAnim}
          style={{ height: 80, width: 80, filter: theme === 'dark' ? 'drop-shadow(0 0 8px #00fff7)' : 'drop-shadow(0 0 8px #bfa14a)' }}
          aria-label="Graduation animation"
        />
      </div>
      <div className="main-content animate__animated animate__fadeInUp" style={{display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', alignItems: 'flex-start'}}>
        <ProfileCard student={user} />
        <AttendanceTable attendance={attendance} />
      </div>
      <div style={{ color: theme === 'dark' ? '#bfa14a' : '#444', fontSize: '1.1em', margin: '32px 0 24px 0', textAlign: 'center', fontFamily: 'serif' }}>
        Manage student details and attendance records with ease
      </div>
      <StudentList setNotification={setNotification} />
    </div>
  );
}

export default App;
