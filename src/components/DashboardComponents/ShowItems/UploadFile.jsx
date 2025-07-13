import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFile } from '../../../redux/actionCreators/fileActionCreator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../AuthComponents/ModernAuth.css';

const UploadFile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [note, setNote] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  const [lastFileId, setLastFileId] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0]?.name || '');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!user?.uid) {
      toast.error('User not found. Please log in again.');
      return;
    }
    if (!file && !note.trim()) {
      toast.error('Please select a file or enter a note.');
      return;
    }
    setUploading(true);
    const action = await dispatch(createFile({
      name: file ? fileName : 'Note',
      type: file ? file.type : 'text',
      content: note,
      userId: user.uid,
    }, file));
    setUploading(false);
    setFile(null);
    setFileName('');
    setNote('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    // Set last uploaded file id if available
    if (action && action.payload && action.payload.id) {
      setLastFileId(action.payload.id);
    }
  };

  return (
    <div className="modern-card p-4 mb-4" style={{ maxWidth: 500, margin: '0 auto', animation: 'fadeInUp 0.7s' }}>
      <ToastContainer position="top-center" autoClose={2000} />
      <h4 className="modern-heading text-center mb-3">Upload File / Add Note</h4>
      <form onSubmit={handleUpload} className="modern-form">
        <div className="form-group my-2">
          <input
            type="file"
            className="form-control"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="*"
            disabled={uploading}
          />
        </div>
        <div className="form-group my-2">
          <input
            type="text"
            className="form-control"
            placeholder="File name (optional)"
            value={fileName}
            onChange={e => setFileName(e.target.value)}
            disabled={uploading || !file}
          />
        </div>
        <div className="form-group my-2">
          <textarea
            className="form-control"
            placeholder="Or write a note..."
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={3}
            disabled={uploading}
          />
        </div>
        <button type="submit" className="btn btn-primary form-control mt-2" style={{ color: 'black', transition: 'background 0.3s, transform 0.2s' }} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload / Save'}
        </button>
        {lastFileId && (
          <div className="text-center mt-3 fade-in">
            <a href="#created-file-{lastFileId}" className="auth-link">Go to last uploaded file</a>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadFile; 