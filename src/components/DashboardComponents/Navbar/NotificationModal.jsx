import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, markActivityRead, markAllActivitiesRead } from '../../../redux/actionCreators/activityActionCreator';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../AuthComponents/ModernAuth.css';

const actionLabels = {
  create: 'Created',
  edit: 'Edited',
  delete: 'Deleted',
  upload: 'Uploaded',
  share: 'Shared',
};
const actionTypes = Object.keys(actionLabels);

const NotificationModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user?.uid);
  const { activities, isLoading } = useSelector(state => state.activity);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (userId) {
      dispatch(getActivities(userId, 20));
    }
  }, [dispatch, userId]);

  const filtered = filter === 'all' ? activities : activities.filter(a => a.actionType === filter);

  const handleMarkRead = (id) => {
    dispatch(markActivityRead(id));
  };
  const handleMarkAllRead = () => {
    dispatch(markAllActivitiesRead());
  };

  const handleExportCSV = () => {
    const csv = [
      ['Type', 'Item', 'Time', 'Read'],
      ...activities.map(a => [
        actionLabels[a.actionType] || a.actionType,
        a.itemName,
        a.timestamp?.seconds ? new Date(a.timestamp.seconds * 1000).toLocaleString() : new Date(a.timestamp).toLocaleString(),
        a.read ? 'Read' : 'Unread',
      ])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'activity_log.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="position-fixed top-0 left-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.4)', zIndex: 9999, animation: 'fadeIn 0.3s' }}>
      <ToastContainer position="top-center" autoClose={1500} />
      <div className="modern-card p-4" style={{ minWidth: 350, maxWidth: 500, width: '100%', position: 'relative', animation: 'scaleIn 0.5s' }}>
        <button className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2" onClick={onClose}>&times;</button>
        <h4 className="modern-heading mb-3">Notifications & Activity</h4>
        <div className="d-flex justify-content-between align-items-center mb-2 gap-2 flex-wrap">
          <div className="d-flex gap-1 flex-wrap">
            <button className={`btn btn-sm ${filter === 'all' ? 'btn-info' : 'btn-outline-info'} animated-link`} onClick={() => setFilter('all')}>All</button>
            {actionTypes.map(type => (
              <button key={type} className={`btn btn-sm ${filter === type ? 'btn-info' : 'btn-outline-info'} animated-link`} onClick={() => setFilter(type)}>{actionLabels[type]}</button>
            ))}
          </div>
          <div className="d-flex gap-1 flex-wrap">
            <button className="btn btn-sm btn-outline-success animated-link" onClick={handleMarkAllRead}>Mark all as read</button>
            <button className="btn btn-sm btn-outline-secondary animated-link" onClick={handleExportCSV}>Export CSV</button>
          </div>
        </div>
        <div style={{ maxHeight: 350, overflowY: 'auto' }}>
          {isLoading ? (
            <div className="text-center my-4">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="alert alert-info">No recent activity.</div>
          ) : (
            <ul className="list-unstyled mb-0">
              {filtered.map((a, i) => (
                <li
                  key={a.id || i}
                  className={`mb-3 p-2 rounded animated-widget d-flex justify-content-between align-items-center ${!a.read ? 'bg-warning bg-opacity-25' : ''}`}
                  style={{ background: !a.read ? 'rgba(255,193,7,0.15)' : 'rgba(0,176,241,0.07)', cursor: !a.read ? 'pointer' : 'default', transition: 'background 0.3s' }}
                  onClick={() => !a.read && handleMarkRead(a.id)}
                  title={!a.read ? 'Mark as read' : ''}
                >
                  <span>
                    <span className="fw-bold">{actionLabels[a.actionType] || a.actionType}</span> {a.itemType} <span className="fw-bold">{a.itemName}</span>
                    <span className="text-muted ms-2" style={{ fontSize: 13 }}>
                      {a.timestamp?.seconds ? new Date(a.timestamp.seconds * 1000).toLocaleString() : new Date(a.timestamp).toLocaleString()}
                    </span>
                  </span>
                  {!a.read && <span className="badge bg-warning text-dark ms-2">Unread</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal; 