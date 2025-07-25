import React from 'react';
import LoginForm from '../../../components/AuthComponents/LoginForm';
import { Link } from 'react-router-dom';
import backgroundImage from '../../../assets/7620.jpg'; 
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
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div style={containerStyle}> 
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(255,255,255,0.25)',
        zIndex: 0,
        animation: 'fadeIn 1.2s',
      }} />
      <h1 className="modern-heading display-1 my-5 text-center fade-in" style={{zIndex: 1}}>Login Here</h1>
      <div className="row justify-content-center w-100" style={{zIndex: 1}}>
        <div className="col-md-6 modern-card p-4 animated-modal" style={{marginTop: '2rem'}}>
          <LoginForm />
          <Link to="/register" className="d-block text-center mt-3 auth-link fade-in">
            Not a member? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
