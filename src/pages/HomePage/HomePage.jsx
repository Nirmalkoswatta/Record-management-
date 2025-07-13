import React from 'react';
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
                <div className="my-5 text-center relative">
                    <h1 
                        style={{
                            fontFamily: 'Zapfino, cursive', // Use Zapfino as primary font with fallback to generic cursive
                            color: 'black',
                            fontSize: '3rem', // Adjust font size as needed
                            position: 'absolute',
                            top: '150px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    > 
                        Furry Pet Clinic Record Management System
                    </h1>
                </div>
            </div>
        </>
    );
};

export default HomePage;
