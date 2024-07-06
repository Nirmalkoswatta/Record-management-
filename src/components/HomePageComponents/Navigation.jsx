import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from "../../redux/actionCreators/authActionCreator";

const NavigationComponents = () => {

  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: '#00b0f1' }}>
      <div className="container-fluid">
        <div className="navbar-header">
         
          <Link className="navbar-brand ms-5" to="/" style={{ fontFamily: 'Copperplate Gothic, sans-serif' }}>Furry Pet Clinic Record Management System</Link>
        </div>
        <div className="navbar-right">
          <ul className="nav navbar-nav ms-auto me-5">
          {
  isAuthenticated ? (
    <>
      <li className="nav-item mx-2">
        <p className='my-0 mt-2 mx-2'>
          <span className="text-black">Welcome DR,</span>
          <span className="text-warning">{user.displayName}</span>
        </p>
      </li>
      <li className="nav-item mx-2">
        <Link className="nav-link btn btn-primary btn-sm" to="/dashboard">Dashboard</Link>
      </li>
      <li className="nav-item mx-3">
    <button 
        className="nav-link btn btn-primary btn-sm" 
        onClick={() => dispatch(signOutUser())} 
        style={{ color: 'red' }} 
    >
        Logout
    </button>
</li>

    </>
  ) : (
    <>
      <li className="nav-item mx-2">
        <Link className="nav-link btn btn-primary btn-sm" to="/login">Login</Link>
      </li>
      <li className="nav-item mx-2">
        <Link className="nav-link btn btn-success btn-sm" to="/register">Register</Link>
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
