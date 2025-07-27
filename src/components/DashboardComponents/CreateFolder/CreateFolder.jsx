import React, { useState } from 'react';
import { faTimes, faFolder, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { createFolder } from '../../../redux/actionCreators/fileFoldersActionCreator'; 

const CreateFolder = ({ setISCreatedFolderModalOpen }) => {
    const [folderName, setFolderName] = useState("");
    const [error, setError] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const { user, currentFolder } = useSelector(state => ({
        user: state.auth.user,
        currentFolder: state.fileFolders?.currentFolder,
    }), shallowEqual);

    const dispatch = useDispatch();
    // Import changeFolder to navigate into newly created folder
    const { changeFolder } = require('../../../redux/actionCreators/fileFoldersActionCreator');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError("User not found. Please log in again.");
            return;
        }
        if (isFolderNameValid()) {
            setIsCreating(true);
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

            try {
                // Create folder and get new folder object
                const newFolder = await dispatch(createFolder(data));
                // Reset input
                setFolderName("");
                // Navigate into newly created folder
                dispatch(changeFolder(newFolder.id));
                setISCreatedFolderModalOpen(false);
            } catch (error) {
                setError("Failed to create folder. Please try again.");
            } finally {
                setIsCreating(false);
            }
        }
    };

    return (
        <AnimatePresence>
            <motion.div 
                className="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setISCreatedFolderModalOpen(false)}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    backdropFilter: 'blur(5px)'
                }}
            >
                <motion.div
                    className="modern-modal"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '30px',
                        width: '90%',
                        maxWidth: '400px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
                        position: 'relative'
                    }}
                >
                    {/* Close Button */}
                    <motion.button
                        onClick={() => setISCreatedFolderModalOpen(false)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </motion.button>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ textAlign: 'center', marginBottom: '30px' }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            style={{
                                width: '60px',
                                height: '60px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px',
                                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                            }}
                        >
                            <FontAwesomeIcon icon={faFolder} size="lg" style={{ color: 'white' }} />
                        </motion.div>
                        
                        <h2 style={{
                            background: 'linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontSize: '1.8rem',
                            fontWeight: '700',
                            margin: 0
                        }}>
                            Create New Folder
                        </h2>
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{ marginBottom: '20px' }}
                        >
                            <input
                                type="text"
                                placeholder="📁 Enter folder name"
                                value={folderName}
                                onChange={(e) => {
                                    setFolderName(e.target.value);
                                    setError("");
                                }}
                                style={{
                                    width: '100%',
                                    padding: '15px 20px',
                                    borderRadius: '12px',
                                    border: '2px solid rgba(255, 255, 255, 0.1)',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: 'white',
                                    fontSize: '16px',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    fontFamily: 'Poppins, sans-serif'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                }}
                            />
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        color: '#ff6b6b',
                                        fontSize: '14px',
                                        marginTop: '8px',
                                        marginBottom: 0
                                    }}
                                >
                                    {error}
                                </motion.p>
                            )}
                        </motion.div>

                        <motion.button
                            type="submit"
                            disabled={isCreating || !folderName.trim()}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            style={{
                                width: '100%',
                                padding: '15px',
                                borderRadius: '12px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: isCreating || !folderName.trim() ? 'not-allowed' : 'pointer',
                                opacity: isCreating || !folderName.trim() ? 0.6 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                fontFamily: 'Poppins, sans-serif'
                            }}
                        >
                            {isCreating ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            border: '2px solid rgba(255, 255, 255, 0.3)',
                                            borderTop: '2px solid white',
                                            borderRadius: '50%'
                                        }}
                                    />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faPlus} />
                                    Create Folder
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CreateFolder;
