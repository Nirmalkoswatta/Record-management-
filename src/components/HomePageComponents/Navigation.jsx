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
            Furry Pet Clinic Record Management System
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
                      <span style={{ color: 'black', fontWeight: 700 }} className="ms-1">{user.displayName}</span>
                    </p>
                  </li>
                  <li className="nav-item mx-2">
                    <Link className="nav-link btn btn-primary btn-sm animated-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item mx-3">
                    <button 
                      className="nav-link btn btn-light btn-sm animated-link"
                      onClick={() => dispatch(signOutUser())}
                      style={{ color: 'red', fontWeight: 600, border: '1px solid red' }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-2">
                    <Link className="nav-link btn btn-light btn-sm animated-link" to="/login" style={{ color: 'green', fontWeight: 600, border: '1px solid green' }}>Login</Link>
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
    </nav>
  );
};

export default NavigationComponents;
