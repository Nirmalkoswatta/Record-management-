import React from 'react';
import LoginForm from '../../../components/AuthComponents/LoginForm';
import { Link } from 'react-router-dom';
import backgroundImage from '../../../assets/login.jpg'; 

const Login = () => {
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
    <div style={containerStyle}> 
      <h1 className="display-1 my-5 text-center text-black">Login Here</h1> 
      <div className="row justify-content-center"> 
        <div className="col-md-6" style={formContainerStyle}> 
          <LoginForm />
          <Link to="/register" className="d-block text-center mt-3">
            Not a member? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
