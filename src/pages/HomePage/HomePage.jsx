import React from 'react';
import { Link } from 'react-router-dom';
import NavigationComponents from '../../components/HomePageComponents/Navigation';
import homepageBg from '../../assets/7620.jpg';

export const HomePage = () => {
    return (
        <>
            <NavigationComponents />
            <div
                style={{
                    backgroundImage: `url(${homepageBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '91.3vh', 
                    display: 'flex',
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                }}
            >
                <div className="my-5 text-center relative" style={{ width: '100%' }}>
                    <h1 
                        style={{
                            fontFamily: 'Zapfino, cursive',
                            color: 'black',
                            fontSize: '3rem',
                            position: 'absolute',
                            top: '150px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        Clinic Record Management System
                    </h1>
                    <div
                      style={{
                        position: 'absolute',
                        top: '320px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 2,
                      }}
                    >
                      <div
                        className="modern-card shadow-lg"
                        style={{
                          padding: '2.5rem 3.5rem',
                          borderRadius: '32px',
                          background: 'rgba(255,255,255,0.95)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}
                      >
                        <Link
                          to="/dashboard"
                          className="btn"
                          style={{
                            background: 'linear-gradient(90deg, #ff5858 0%, #f857a6 100%)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '25px',
                            fontWeight: 700,
                            padding: '18px 54px',
                            boxShadow: '0 4px 16px rgba(255,88,88,0.15)',
                            letterSpacing: '1px',
                            fontSize: '1.6rem',
                            transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s',
                            outline: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '0.5rem',
                          }}
                          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.06)'}
                          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <i className="fas fa-tachometer-alt"></i> Go to Dashboard
                        </Link>
                        <span style={{ color: '#888', fontSize: '1rem', marginTop: 8 }}>Access your records and files</span>
                      </div>
                    </div>
// animation keyframes moved to App.css
                </div>
            </div>
        </>
    );
};

export default HomePage;
