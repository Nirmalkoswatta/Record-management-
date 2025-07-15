import React from 'react';
import LoginForm from '../../../components/AuthComponents/LoginForm';
import { Link } from 'react-router-dom';
import backgroundImage from '../../../assets/login.jpg'; 
import '../../../components/AuthComponents/ModernAuth.css';

const Login = () => {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    minHeight: '100vh', 
    padding: '5%', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}> 
      <h1 className="modern-heading display-1 my-5 text-center">Login Here</h1>
      <div className="row justify-content-center w-100">
        <div className="col-md-6 modern-card p-4" style={{marginTop: '2rem'}}>
          <LoginForm />
          <Link to="/register" className="d-block text-center mt-3 auth-link">
            Not a member? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
