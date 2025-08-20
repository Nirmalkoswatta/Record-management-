import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFile, createFile } from '../../../redux/actionCreators/fileActionCreator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../AuthComponents/ModernAuth.css';

const FileModal = ({ file, onClose }) => {
  const dispatch = useDispatch();
  const [editContent, setEditContent] = useState(file.content || '');
  const [replacing, setReplacing] = useState(false);
  const [newFile, setNewFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await dispatch(updateFile(file.id, { content: editContent }));
    setSaving(false);
    toast.success('File updated!');
  };

  const handleReplace = async (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setReplacing(true);
    // Create a new file with the same name, userId, etc.
    await dispatch(createFile({
      name: file.name,
      userId: file.userId,
      type: selected.type,
      content: '',
    }, selected));
    setReplacing(false);
    toast.success('File replaced!');
    onClose();
  };

  return (
  <div className="position-fixed top-0 left-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.36)', zIndex: 9999, animation: 'fadeIn 0.3s' }}>
      <ToastContainer position="top-center" autoClose={2000} />
      <button
        className="btn position-fixed"
        onClick={onClose}
        style={{
          top: 'calc(50% - 250px)',
          right: 'calc(50% - 320px)',
          position: 'fixed',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#fff',
          background: 'rgba(220,53,69,0.88)',
          border: 'none',
          borderRadius: '50%',
          width: 54,
          height: 54,
          lineHeight: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          zIndex: 99999,
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        aria-label="Close"
      >
        &times;
      </button>
      <div className="modern-card p-4" style={{ minWidth: 350, maxWidth: 600, width: '100%', position: 'relative', animation: 'scaleIn 0.5s', zIndex: 10 }}>
        <h4 className="modern-heading mb-3">{file.name}</h4>
        <div className="mb-3">
          <span className="badge bg-info me-2">{file.type}</span>
          <span className="badge bg-secondary">{new Date(file.createdAt?.seconds ? file.createdAt.seconds * 1000 : file.createdAt).toLocaleString()}</span>
        </div>
        {file.type === 'text' ? (
          <>
            <textarea
              className="form-control mb-3"
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              rows={8}
              style={{ fontFamily: 'monospace', fontSize: 16 }}
              disabled={saving}
            />
            <button className="btn btn-success w-100" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
          </>
        ) : file.type.startsWith('image') ? (
          <>
            <img src={file.storageUrl} alt={file.name} style={{ width: '100%', borderRadius: 8, marginBottom: 16 }} />
            <label className="btn btn-outline-primary w-100 mt-2">
              {replacing ? 'Replacing...' : 'Replace Image'}
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleReplace} disabled={replacing} />
            </label>
          </>
        ) : file.type.startsWith('video') ? (
          <>
            <video src={file.storageUrl} controls style={{ width: '100%', borderRadius: 8, marginBottom: 16 }} />
            <label className="btn btn-outline-primary w-100 mt-2">
              {replacing ? 'Replacing...' : 'Replace Video'}
              <input type="file" accept="video/*" style={{ display: 'none' }} onChange={handleReplace} disabled={replacing} />
            </label>
          </>
        ) : file.storageUrl ? (
          <>
            <a href={file.storageUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-info w-100 mb-2">Download File</a>
            <label className="btn btn-outline-primary w-100">
              {replacing ? 'Replacing...' : 'Replace File'}
              <input type="file" style={{ display: 'none' }} onChange={handleReplace} disabled={replacing} />
            </label>
          </>
        ) : (
          <div className="alert alert-warning">No preview available.</div>
        )}
      </div>
    </div>
  );
};

export default FileModal; 