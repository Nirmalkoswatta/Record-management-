import React, { useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { createFolder } from '../../../redux/actionCreators/fileFoldersActionCreator'; 

const CreateFolder = ({ setISCreatedFolderModalOpen }) => {
    const [folderName, setFolderName] = useState("");
    const [error, setError] = useState("");

    const { user, currentFolder } = useSelector(state => ({
        user: state.auth.user,
        currentFolder: state.fileFolder?.currentFolder,
    }), shallowEqual);

    const dispatch = useDispatch();

    const isFolderNameValid = () => {
        if (!folderName.trim()) {
            setError("Folder name cannot be empty");
            return false;
        } else if (folderName.trim().length < 3) {
            setError("Folder name must be at least 3 characters long");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            setError("User not found. Please log in again.");
            return;
        }
        if (isFolderNameValid()) {
            const data = {
                createdAt: new Date(),
                name: folderName.trim(),
                userId: user.uid,
                createdBy: user.displayName,
                path: currentFolder === "root" ? [] : ["parent folder path!"],
                parent: currentFolder,
                lastAccessed: null,
                updatedAt: new Date(),
            };

            dispatch(createFolder(data)); 
            setFolderName("");
            setISCreatedFolderModalOpen(false); // Close the modal after creating folder
        }
    };

    return (
        <div className="col-md-12 position-fixed top-0 left-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: "rgba(0, 0, 0, 0.4)", zIndex: 9999 }}>
            <div className='col-md-4 bg-white rounded p-4'>
                <div className='d-flex justify-content-between'>
                    <h4>Create Folder</h4>
                    <button className='btn' onClick={() => setISCreatedFolderModalOpen(false)}>
                        <FontAwesomeIcon
                            icon={faTimes}
                            className='text-black'
                            size='sm'
                        />
                    </button>
                </div>
                <hr />
                <div className='d-flex flex-column align-items-center'>
                    <form className='mt-3 w-100' onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id='folderName'
                                placeholder="Folder Name"
                                value={folderName}
                                onChange={(e) => {
                                    setFolderName(e.target.value);
                                    setError("");
                                }}
                            />
                            {error && <small className="text-danger">{error}</small>}
                        </div>
                        <button
                            type='submit'
                            className='btn btn-primary mt-2 form-control'
                        >
                            Create Folder
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateFolder;
