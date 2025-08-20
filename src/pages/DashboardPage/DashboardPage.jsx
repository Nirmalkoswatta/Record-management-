import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/DashboardComponents/Navbar/Navbar";
import SubBar from '../../components/DashboardComponents/SubBar/SubBar';
import HomeComponents from '../../components/DashboardComponents/HomeComponents/HomeComponents';
import CreateFolder from '../../components/DashboardComponents/CreateFolder/CreateFolder';
import { getFolders } from '../../redux/actionCreators/fileFoldersActionCreator';
import '../../components/AuthComponents/ModernAuth.css';
import dashboardBg from '../../assets/7620.jpg';

const DashboardPage = () => {
  const [isCreateFolderModalOpen, setISCreatedFolderModalOpen] = useState(false);
  
  const { isLoggedIn, isLoading, userId } = useSelector((state) => ({
    isLoggedIn: state.auth.isAuthenticated,
    isLoading: state.filefolders?.isLoading,
    userId: state.auth.user.uid,
  }), shallowEqual);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      dispatch(getFolders(userId))
    }
  }, [isLoading, isLoggedIn, dispatch,userId]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
      {isCreateFolderModalOpen && (
          <div className="animated-modal">
        <CreateFolder setISCreatedFolderModalOpen={setISCreatedFolderModalOpen} />
          </div>
      )}
        <Navbar className="modern-navbar" />
        <div className="dashboard-section">
      <SubBar setISCreatedFolderModalOpen={setISCreatedFolderModalOpen} />
      <HomeComponents />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
