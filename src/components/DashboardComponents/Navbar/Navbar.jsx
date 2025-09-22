import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from "../../../redux/actionCreators/authActionCreator";
import '../../AuthComponents/ModernAuth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import UserProfileModal from './UserProfileModal';


const Navbar = ({ className = '' }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  // Removed dark mode toggle
  const [showProfile, setShowProfile] = useState(false);





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

          {isAuthenticated && (
            <>

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
                      <span style={{ color: '#fff' }}>Welcome DR,</span>
                      <span className="ms-1 navbar-username" style={{ fontWeight: 700 }}>{user.displayName}</span>
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
    </nav>
  );
};

export default Navbar;
