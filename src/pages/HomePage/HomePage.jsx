import React from 'react';
import NavigationComponents from '../../components/HomePageComponents/Navigation';
import backgroundGIF from '../../assets/bg111.gif'; 

export const HomePage = () => {
    return (
        <>
            <NavigationComponents />
            <div
                style={{
                    backgroundImage: `url(${backgroundGIF})`,
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
                            top: '380px',
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
