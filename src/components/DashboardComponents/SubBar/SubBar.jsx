import React from 'react';
import "../SubBar/SubBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faFileUpload, faFolderPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const SubBar = ({ setISCreatedFolderModalOpen}) => {

  return (
    <nav className='navbar navbar-expand-lg mt-2 navbar-light bg-white py-2 py-2'>

      <p>Root</p>

      <ul className='navbar-nav ms-auto me-5'>
        <li className='nav-item mx-2'>
          <button className='btn btn-outline-dark'>
            <FontAwesomeIcon icon={faFileUpload} /> &nbsp;  Upload File
          </button>
        </li>

        <li className='nav-item mx-2'>
          <button className='btn btn-outline-dark'>
            <FontAwesomeIcon icon={faFileAlt} /> &nbsp;  File
          </button>
        </li>

        <li className='nav-item mx-2'>
          <button className='btn btn-outline-dark' 
          onClick={()=>setISCreatedFolderModalOpen(true)} >
            <FontAwesomeIcon icon={faFolderPlus} /> &nbsp; Create Folders
          </button>
        </li>

        <li className='nav-item ms-2 '>
          <button className='btn btn-outline-dark delete-btn'>
            <FontAwesomeIcon icon={faTrashAlt} /> &nbsp; Delete File
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default SubBar;
