import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from "../../../redux/actionCreators/authActionCreator";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg shadow-sm p-3" style={{ backgroundColor: '#00b0f1' }}>
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand ms-5" to="/dashboard"> Clinic Records </Link>
        </div>
        <div className="ms-auto me-5">
          <ul className="nav navbar-nav">
            {
              isAuthenticated ? (
                <>
                  <li className="nav-item mx-2">
                    <p className='my-0 mt-2 mx-2'>
                      <span className="text-dark">Welcome DR,</span>
                      <span className="fw-bold">{user.displayName}</span>
                    </p>
                  </li>
                  <li className="nav-item mx-2">
                    <Link className="nav-link btn btn-primary" to="/">Home</Link>
                  </li>
                  <li className="nav-item mx-2">
                    <button className="nav-link btn btn-success" onClick={() => dispatch(signOutUser())}>Logout</button>
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

export default Navbar;
