import React, { useEffect } from 'react'; // Correctly import useEffect from 'react'
import { Routes, Route } from 'react-router-dom'; // No useEffect in 'react-router-dom'
import './App.css';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import  HomePage  from "./pages/HomePage/HomePage"; 
import Register from './pages/AuthPages/Register/Register';
import Login from './pages/AuthPages/Login/Login';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import { checkIsLoggedIn } from './redux/actionCreators/authActionCreator';


const App = () => {

 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(checkIsLoggedIn());
},[]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
      </Routes>
      
      {/* Global Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{
          fontSize: '14px',
          borderRadius: '12px'
        }}
      />
    </div>
  );
};
 
export default App;
