import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFiles } from '../../../redux/actionCreators/fileActionCreator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../AuthComponents/ModernAuth.css';

const DeleteFileModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const files = useSelector(state => state.file.files);
  const [selected, setSelected] = useState([]);
  const [deleting, setDeleting] = useState(false);

  const handleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleDelete = async () => {
    if (selected.length === 0) {
      toast.error('Please select at least one file to delete.');
      return;
    }
    setDeleting(true);
    await dispatch(deleteFiles(selected));
    setDeleting(false);
    toast.success('File(s) deleted!');
    onClose();
  };

  return (
    <div className="position-fixed top-0 left-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.4)', zIndex: 9999, animation: 'fadeIn 0.3s' }}>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="modern-card p-4" style={{ minWidth: 350, maxWidth: 600, width: '100%', position: 'relative', animation: 'scaleIn 0.5s' }}>
        <button className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2" onClick={onClose}>&times;</button>
        <h4 className="modern-heading mb-3">Delete Files</h4>
        <div className="mb-3" style={{ maxHeight: 300, overflowY: 'auto' }}>
          {files.length === 0 ? (
            <div className="alert alert-info">No files available.</div>
          ) : (
            files.map(file => (
              <div key={file.id} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`delete-file-${file.id}`}
                  checked={selected.includes(file.id)}
                  onChange={() => handleSelect(file.id)}
                  disabled={deleting}
                />
                <label className="form-check-label" htmlFor={`delete-file-${file.id}`}>
                  {file.name} <span className="badge bg-secondary ms-2">{file.type}</span>
                </label>
              </div>
            ))
          )}
        </div>
        <button className="btn btn-danger w-100 mt-2" onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Deleting...' : 'Delete Selected'}
        </button>
      </div>
    </div>
  );
};

export default DeleteFileModal; 