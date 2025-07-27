import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from "../../redux/actionCreators/authActionCreator";

const NavigationComponents = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg modern-navbar animated-navbar fade-in shadow-sm" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand ms-5 animated-brand" to="/" style={{ fontFamily: 'Copperplate Gothic, sans-serif', fontWeight: 700, fontSize: '1.5rem', letterSpacing: 1 }}>
            Clinic Record Management System
          </Link>
        </div>
        <div className="navbar-right">
          <ul className="nav navbar-nav ms-auto me-5 d-flex align-items-center gap-2">
            {
              isAuthenticated ? (
                <>
                  <li className="nav-item mx-2">
                    <p className='my-0 mt-2 mx-2'>
                      <span style={{ color: 'black', fontWeight: 600 }}>Welcome DR,</span>
                      <span style={{ color: '#FFD600', fontWeight: 700 }} className="ms-1">{user.displayName}</span>
                    </p>
                  </li>
                  <li className="nav-item mx-2">
                    <Link className="nav-link btn btn-primary btn-sm animated-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item mx-3">
                    <button
                      className="nav-link btn modern-logout-btn"
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
                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-2">
                    <Link
                      className="nav-link btn animated-link"
                      to="/login"
                      style={{
                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '25px',
                        fontWeight: 700,
                        padding: '8px 28px',
                        boxShadow: '0 4px 16px rgba(102,126,234,0.15)',
                        letterSpacing: '1px',
                        fontSize: '1.1rem',
                        transition: 'background 0.2s, box-shadow 0.2s',
                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <i className="fas fa-sign-in-alt"></i> Login
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link
                      className="nav-link btn animated-link"
                      to="/register"
                      style={{
                        background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '25px',
                        fontWeight: 700,
                        padding: '8px 28px',
                        boxShadow: '0 4px 16px rgba(67,233,123,0.15)',
                        letterSpacing: '1px',
                        fontSize: '1.1rem',
                        transition: 'background 0.2s, box-shadow 0.2s',
                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <i className="fas fa-user-plus"></i> Register
                    </Link>
                  </li>
                </>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationComponents;
