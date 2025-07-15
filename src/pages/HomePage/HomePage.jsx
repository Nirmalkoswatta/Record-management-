import React from 'react';
import NavigationComponents from '../../components/HomePageComponents/Navigation';
import homepageBg from '../../assets/7620.jpg';
import '../../components/AuthComponents/ModernAuth.css';

// Add bubble animation CSS inline for now
const bubbleStyles = `
.bubbles {
  position: absolute;
  top: 0; left: 0; width: 100vw; height: 100vh;
  overflow: hidden; z-index: 0;
}
.bubble {
  position: absolute;
  bottom: -100px;
  background: rgba(0,176,241,0.15);
  border-radius: 50%;
  opacity: 0.7;
  animation: bubbleUp 12s linear infinite;
}
@keyframes bubbleUp {
  0% { transform: translateY(0) scale(1); opacity: 0.7; }
  80% { opacity: 0.5; }
  100% { transform: translateY(-110vh) scale(1.2); opacity: 0; }
}
`;

export const HomePage = () => {
    // Generate random bubbles
    const bubbles = Array.from({ length: 18 }).map((_, i) => {
        const size = Math.random() * 60 + 40;
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 8 + Math.random() * 8;
        return (
            <div
                key={i}
                className="bubble"
                style={{
                    width: size,
                    height: size,
                    left: `${left}%`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                }}
            />
        );
    });
    return (
        <>
            <style>{bubbleStyles}</style>
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
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div className="bubbles">{bubbles}</div>
                <div className="modern-card animated-modal fade-in d-flex flex-column align-items-center justify-content-center" style={{ minWidth: 400, maxWidth: 600, marginTop: '8rem', padding: '3rem 2rem', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)', borderRadius: 24, backdropFilter: 'blur(10px)', zIndex: 2 }}>
                    <h1 className="modern-heading mb-3" style={{ fontSize: '2.5rem', letterSpacing: 1 }}>Furry Pet Clinic Record Management System</h1>
                    <p className="fade-in" style={{ fontSize: '1.2rem', color: '#333', marginBottom: 24, fontWeight: 500, textShadow: '0 2px 8px rgba(0,176,241,0.08)' }}>
                        Securely manage your veterinary records with ease and style.
                    </p>
                    <a href="/login" className="btn btn-primary animated-link" style={{ fontWeight: 600, fontSize: '1.1rem', borderRadius: 12, padding: '0.75rem 2rem', boxShadow: '0 2px 8px rgba(0,176,241,0.08)' }}>
                        Get Started
                    </a>
                </div>
            </div>
        </>
    );
};

export default HomePage;
