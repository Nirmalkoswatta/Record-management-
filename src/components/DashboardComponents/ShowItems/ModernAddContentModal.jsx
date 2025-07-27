import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faFileAlt, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { addFileToFolder, addNoteToFolder } from '../../../redux/actionCreators/fileFoldersActionCreator';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../config/firebase';
import { toast } from 'react-toastify';

const ModernAddContentModal = ({ isOpen, onClose, folderId }) => {
  const [activeTab, setActiveTab] = useState('file');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  
  // Note creation state
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  
  const dispatch = useDispatch();
  const { currentFolder } = useSelector(state => state.fileFolders);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile || !fileName.trim()) {
      toast.error('Please select a file and enter a name');
      return;
    }

    setIsUploading(true);
    try {
      // Upload to Firebase Storage
      const fileRef = ref(storage, `files/${currentFolder.id}/${Date.now()}_${selectedFile.name}`);
      const snapshot = await uploadBytes(fileRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Add to Firestore
      const fileData = {
        name: fileName,
        originalName: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
        storageUrl: downloadURL,
        userId: currentFolder.userId,
      };

      dispatch(addFileToFolder(fileData, folderId));
      
      // Reset form
      setSelectedFile(null);
      setFileName('');
      onClose();
      
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const createNote = async () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      toast.error('Please enter both title and content');
      return;
    }

    setIsUploading(true);
    try {
      const noteData = {
        title: noteTitle,
        content: noteContent,
        userId: currentFolder.userId,
      };

      dispatch(addNoteToFolder(noteData, folderId));
      
      // Reset form
      setNoteTitle('');
      setNoteContent('');
      onClose();
      
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Failed to create note');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
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
          zIndex: 1000,
          backdropFilter: 'blur(5px)'
        }}
      >
        <motion.div
          className="modal-content"
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
            maxWidth: '500px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}
        >
          {/* Close Button */}
          <motion.button
            onClick={onClose}
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
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: '1.8rem',
              fontWeight: '700'
            }}
          >
            Add to {currentFolder?.name}
          </motion.h2>

          {/* Tabs */}
          <div style={{ display: 'flex', marginBottom: '30px', gap: '10px' }}>
            <motion.button
              onClick={() => setActiveTab('file')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                flex: 1,
                padding: '12px 20px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === 'file' 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              📄 Upload File
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('note')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                flex: 1,
                padding: '12px 20px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === 'note' 
                  ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                  : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              📝 Create Note
            </motion.button>
          </div>

          {/* File Upload Tab */}
          {activeTab === 'file' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Drag and Drop Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${dragActive ? '#667eea' : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '16px',
                  padding: '40px 20px',
                  textAlign: 'center',
                  marginBottom: '20px',
                  background: dragActive ? 'rgba(102, 126, 234, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onClick={() => document.getElementById('file-input').click()}
              >
                <FontAwesomeIcon 
                  icon={faUpload} 
                  size="3x" 
                  style={{ 
                    color: dragActive ? '#667eea' : 'rgba(255, 255, 255, 0.6)',
                    marginBottom: '15px'
                  }} 
                />
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 10px 0' }}>
                  {selectedFile ? selectedFile.name : 'Drag & drop a file here'}
                </p>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', margin: 0 }}>
                  or click to browse
                </p>
              </div>

              <input
                id="file-input"
                type="file"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />

              {/* File Name Input */}
              <input
                type="text"
                placeholder="Enter file name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '16px',
                  marginBottom: '20px',
                  outline: 'none',
                  transition: 'all 0.3s ease'
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

              {/* Upload Button */}
              <motion.button
                onClick={uploadFile}
                disabled={!selectedFile || !fileName.trim() || isUploading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: selectedFile && fileName.trim() && !isUploading ? 'pointer' : 'not-allowed',
                  opacity: selectedFile && fileName.trim() && !isUploading ? 1 : 0.6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                {isUploading ? (
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
                    Uploading...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faUpload} />
                    Upload File
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* Note Creation Tab */}
          {activeTab === 'note' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Note Title */}
              <input
                type="text"
                placeholder="Enter note title"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '16px',
                  marginBottom: '20px',
                  outline: 'none',
                  transition: 'all 0.3s ease'
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

              {/* Note Content */}
              <textarea
                placeholder="Write your note content here..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={6}
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '16px',
                  marginBottom: '20px',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '120px',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'all 0.3s ease'
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

              {/* Create Note Button */}
              <motion.button
                onClick={createNote}
                disabled={!noteTitle.trim() || !noteContent.trim() || isUploading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: noteTitle.trim() && noteContent.trim() && !isUploading ? 'pointer' : 'not-allowed',
                  opacity: noteTitle.trim() && noteContent.trim() && !isUploading ? 1 : 0.6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                {isUploading ? (
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
                    <FontAwesomeIcon icon={faFileAlt} />
                    Create Note
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModernAddContentModal;
