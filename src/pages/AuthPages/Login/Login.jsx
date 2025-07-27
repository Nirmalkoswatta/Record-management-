import React from 'react';
import LoginForm from '../../../components/AuthComponents/LoginForm';
import { Link } from 'react-router-dom';

import '../../../components/AuthComponents/ModernAuth.css';
import bgImg from '../../../assets/login.jpg';
const Login = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        width: '100vw',
        padding: 0,
        margin: 0,
        background: `url(${bgImg}) center center / cover no-repeat fixed`,
      }}
    >
      <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <h1 className="modern-heading display-4 mb-4 text-center" style={{ color: '#222', fontWeight: 800 }}>Login to Your Account</h1>
        <div className="modern-card p-4 w-100" style={{
          maxWidth: 900,
          minWidth: 400,
          margin: '0 auto',
          border: 'none',
          background: 'rgba(255,255,255,0.18)',
          color: '#111',
          boxShadow: 'none',
          borderTop: 'none',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}>
          <LoginForm />
          <div className="d-block text-center mt-3" style={{ fontSize: '1.1rem', color: '#111' }}>
            Not a member?{' '}
            <Link to="/register" className="auth-link" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#111', textDecoration: 'underline' }}>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
