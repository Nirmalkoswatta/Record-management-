import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../AuthComponents/ModernAuth.css';

const getShareLink = (item, type) => {
  if (type === 'file') {
    // Direct download/preview link
    return item.storageUrl || window.location.origin + `/file/${item.id}`;
  } else {
    // Folder view link (could be a route like /folder/:id)
    return window.location.origin + `/folder/${item.id}`;
  }
};

const ShareModal = ({ item, type, onClose }) => {
  const [copied, setCopied] = useState(false);
  const link = getShareLink(item, type);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success('Link copied!');
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="position-fixed top-0 left-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.4)', zIndex: 9999, animation: 'fadeIn 0.3s' }}>
      <ToastContainer position="top-center" autoClose={1500} />
      <div className="modern-card p-4" style={{ minWidth: 350, maxWidth: 500, width: '100%', position: 'relative', animation: 'scaleIn 0.5s' }}>
        <button className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2" onClick={onClose}>&times;</button>
        <h4 className="modern-heading mb-3">Share {type === 'file' ? 'File' : 'Folder'}</h4>
        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            value={link}
            readOnly
            style={{ fontSize: 14 }}
            onFocus={e => e.target.select()}
          />
          <button className="btn btn-primary w-100 animated-link" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
        {type === 'file' && item.storageUrl && (
          <a href={item.storageUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-info w-100 mt-2">Open File</a>
        )}
      </div>
    </div>
  );
};

export default ShareModal; 