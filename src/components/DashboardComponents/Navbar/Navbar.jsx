import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from "../../../redux/actionCreators/authActionCreator";
import '../../AuthComponents/ModernAuth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import UserProfileModal from './UserProfileModal';
import NotificationModal from './NotificationModal';

const Navbar = ({ className = '' }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const activities = useSelector(state => state.activity?.activities || []);
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [lastSeen, setLastSeen] = useState(() => Number(localStorage.getItem('lastSeenActivity')) || 0);

  // Count new activities since last open - with safe array handling
  const newCount = Array.isArray(activities) 
    ? activities.filter(a => {
        const timestamp = a.timestamp?.seconds ? a.timestamp.seconds * 1000 : new Date(a.timestamp).getTime();
        return timestamp > lastSeen;
      }).length 
    : 0;

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleOpenNotifications = () => {
    setShowNotifications(true);
    setLastSeen(Date.now());
    localStorage.setItem('lastSeenActivity', Date.now());
  };

  return (
    <nav className={`navbar navbar-expand-lg shadow-sm p-3 modern-navbar animated-navbar ${className}`} style={{ position: 'sticky', top: 0, zIndex: 100, transition: 'background 0.4s, box-shadow 0.4s' }}>
      <div className="container-fluid">
        <div className="navbar-header">
          <Link 
            className="navbar-brand ms-5 animated-brand" 
            to="/dashboard"
            style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: '700',
              textDecoration: 'none',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          > 
            Clinic Records Management
          </Link>
        </div>
        <div className="ms-auto me-5 d-flex align-items-center gap-3">
          <button
            className="btn btn-outline-secondary rounded-circle animated-link me-2"
            style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, transition: 'background 0.3s' }}
            onClick={() => setDarkMode(dm => !dm)}
            aria-label="Toggle dark mode"
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
          {isAuthenticated && (
            <>
              <button
                className="btn btn-outline-primary rounded-circle animated-link me-2 position-relative"
                style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, transition: 'background 0.3s' }}
                onClick={handleOpenNotifications}
                aria-label="Notifications"
              >
                <FontAwesomeIcon icon={faBell} style={{ color: 'black' }} />
                {newCount > 0 && (
                  <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger" style={{ fontSize: 12, minWidth: 18 }}>
                    {newCount}
                  </span>
                )}
              </button>
              <button
                className="btn btn-outline-primary rounded-circle animated-link me-2"
                style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, transition: 'background 0.3s' }}
                onClick={() => setShowProfile(true)}
                aria-label="User profile"
              >
                <FontAwesomeIcon icon={faUserCircle} style={{ color: 'black' }} />
              </button>
            </>
          )}
          <ul className="nav navbar-nav">
            {
              isAuthenticated ? (
                <>
                  <li className="nav-item mx-2">
                    <p className='my-0 mt-2 mx-2'>
                      <span className="text-dark">Welcome DR,</span>
                      <span style={{ color: '#ffe082', fontWeight: 700 }} className="ms-1">{user.displayName}</span>
                    </p>
                  </li>
                  <li className="nav-item mx-2">
                    <Link className="nav-link btn btn-primary animated-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item mx-2">
                    <button
                      className="nav-link btn btn-danger modern-logout-btn"
                      onClick={() => dispatch(signOutUser())}
                      style={{
                        background: 'linear-gradient(90deg, #ff5858 0%, #f857a6 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '25px',
                        fontWeight: 700,
                        padding: '8px 28px',
                        boxShadow: '0 4px 16px rgba(255,88,88,0.15)',
                        letterSpacing: '1px',
                        fontSize: '1.1rem',
                        transition: 'background 0.2s, box-shadow 0.2s',
                      }}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i>Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-2">
                    <Link className="nav-link btn btn-primary btn-sm animated-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link className="nav-link btn btn-success btn-sm animated-link" to="/register">Register</Link>
                  </li>
                </>
              )
            }
          </ul>
        </div>
      </div>
      {showProfile && <UserProfileModal onClose={() => setShowProfile(false)} />}
      {showNotifications && <NotificationModal onClose={() => setShowNotifications(false)} />}
    </nav>
  );
};

export default Navbar;
