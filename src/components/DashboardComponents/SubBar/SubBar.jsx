import React from 'react';
import '../../AuthComponents/ModernAuth.css';

const SubBar = ({ setISCreatedFolderModalOpen }) => {
  return (
  <div className="subbar animated-subbar d-flex justify-content-between align-items-center p-3 mb-4" style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,176,241,0.06)', transition: 'background 0.4s, box-shadow 0.4s' }}>
      <h5 className="mb-0 fw-bold">Quick Actions</h5>
       {/* Removed Create Folder button */}
    </div>
  );
};

export default SubBar;
