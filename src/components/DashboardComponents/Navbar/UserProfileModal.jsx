import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../AuthComponents/ModernAuth.css';

const UserProfileModal = ({ onClose }) => {
  const user = useSelector(state => state.auth.user);
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (auth.currentUser) {
        if (displayName !== user.displayName) {
          await updateProfile(auth.currentUser, { displayName });
        }
        if (email !== user.email) {
          await updateEmail(auth.currentUser, email);
        }
        if (password) {
          await updatePassword(auth.currentUser, password);
        }
        toast.success('Profile updated!');
        setPassword('');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="position-fixed top-0 left-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.4)', zIndex: 9999, animation: 'fadeIn 0.3s' }}>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="modern-card p-4" style={{ minWidth: 350, maxWidth: 500, width: '100%', position: 'relative', animation: 'scaleIn 0.5s' }}>
        <button className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2" onClick={onClose}>&times;</button>
        <h4 className="modern-heading mb-3">Edit Profile</h4>
        <form onSubmit={handleSave} className="modern-form">
          <div className="form-group my-2">
            <label>Display Name</label>
            <input
              type="text"
              className="form-control"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              disabled={saving}
            />
          </div>
          <div className="form-group my-2">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={saving}
            />
          </div>
          <div className="form-group my-2">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={saving}
              placeholder="Leave blank to keep current password"
            />
          </div>
          <button className="btn btn-success w-100 mt-3" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileModal; 