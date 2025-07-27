import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; 
import { signInUser } from '../../redux/actionCreators/authActionCreator'; 
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import './ModernAuth.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please fill in all the fields', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return;
        }

        setIsLoading(true);
        dispatch(signInUser(email, password, setSuccess));
        setTimeout(() => setIsLoading(false), 2000);
    };

    useEffect(() => {
        if (success) {
            toast.success('🎉 Welcome back!', {
                position: "top-right",
                autoClose: 2000,
                theme: "colored",
            });
            setTimeout(() => navigate('/dashboard'), 1000);
        }
    }, [success, navigate]);

    return (
        <div className="auth-container">
            <motion.div 
                className="modern-card"
                style={{ maxWidth: '450px', width: '100%', padding: '40px' }}
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <motion.h1 
                        className="modern-heading"
                        style={{
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            textAlign: 'center',
                            marginBottom: '10px',
                            color: '#111'
                        }}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Welcome Back
                    </motion.h1>
                    
                    <motion.p 
                        style={{
                            textAlign: 'center',
                            color: 'rgba(255, 255, 255, 0.8)',
                            marginBottom: '30px',
                            fontWeight: '300'
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        Sign in to your account
                    </motion.p>
                </motion.div>

                <form autoComplete="off" onSubmit={handleSubmit} className="modern-form">
                    <ToastContainer 
                        position="top-right" 
                        autoClose={3000} 
                        hideProgressBar={false} 
                        newestOnTop 
                        closeOnClick 
                        pauseOnFocusLoss 
                        draggable 
                        pauseOnHover 
                        theme="colored"
                        style={{
                            fontSize: '14px'
                        }}
                    />
                    
                    <motion.div 
                        className="form-group"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                    >
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="✉️ Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ fontSize: '16px' }}
                        />
                    </motion.div>
                    
                    <motion.div 
                        className="form-group"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                    >
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="🔒 Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ fontSize: '16px' }}
                        />
                    </motion.div>
                    
                    <motion.button 
                        type="submit" 
                        className="btn btn-primary form-control"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 'none',
                            borderRadius: '16px',
                            padding: '16px 24px',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: 'white',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {isLoading ? (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                        borderTop: '2px solid white',
                                        borderRadius: '50%',
                                        marginRight: '10px'
                                    }}
                                />
                                Signing In...
                            </motion.span>
                        ) : '🚀 Sign In'}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default LoginForm;
