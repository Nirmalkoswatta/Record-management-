import React from 'react';
import RegisterForm from '../../../components/AuthComponents/RegisterForm';
import { Link } from 'react-router-dom';
import backgroundImage from '../../../assets/login.jpg';

const Register = () => {
 
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '5%',
  };

  
  const formContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  };

  return (
    <div className="container-fluid" style={containerStyle}>
      <h1 className="display-1 my-5 text-center">Register Here</h1> 
      <div className="row">
        <div className="col-md-6 mx-auto" style={formContainerStyle}> 
          <RegisterForm />
          <Link to="/login">
            Already a member? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
