import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import ShowItems from "../ShowItems/ShowItems";
import UploadFile from "../ShowItems/UploadFile";
import DeleteFileModal from "../ShowItems/DeleteFileModal";
import { getFiles } from '../../../redux/actionCreators/fileActionCreator';

const HomeComponents = () => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [search, setSearch] = useState('');
  const { isLoading, userFolders } = useSelector(
    (state) => ({
      isLoading: state.fileFolder?.isLoading,
      userFolders: state.fileFolder?.userFolders,
    }),
    shallowEqual
  );
  const { files, isFileLoading } = useSelector(
    (state) => ({
      files: state.file.files,
      isFileLoading: state.file.isLoading,
    }),
    shallowEqual
  );
  const userId = useSelector(state => state.auth.user?.uid);

  useEffect(() => {
    if (userId) {
      dispatch(getFiles(userId));
    }
  }, [dispatch, userId]);

  // Analytics
  const totalFiles = files.length;
  const totalFolders = userFolders.length;
  const recentFiles = files.slice(-3).reverse();

  // Search filter
  const filteredFolders = userFolders.filter(f => f.name?.toLowerCase().includes(search.toLowerCase()));
  const filteredFiles = files.filter(f => f.name?.toLowerCase().includes(search.toLowerCase()) || f.type?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="col-md-12 w-100">
      {/* Analytics Widgets */}
      <div className="row mb-4 gap-3 justify-content-center">
        <div className="col-md-2 modern-card text-center p-3 animated-widget" style={{ minWidth: 180, animation: 'fadeInUp 0.7s' }}>
          <h6 className="mb-1">Total Files</h6>
          <div className="display-6 fw-bold">{totalFiles}</div>
        </div>
        <div className="col-md-2 modern-card text-center p-3 animated-widget" style={{ minWidth: 180, animation: 'fadeInUp 0.9s' }}>
          <h6 className="mb-1">Total Folders</h6>
          <div className="display-6 fw-bold">{totalFolders}</div>
        </div>
        <div className="col-md-4 modern-card text-center p-3 animated-widget" style={{ minWidth: 220, animation: 'fadeInUp 1.1s' }}>
          <h6 className="mb-2">Recent Activity</h6>
          {recentFiles.length === 0 ? (
            <div className="text-muted">No recent files</div>
          ) : (
            <ul className="list-unstyled mb-0">
              {recentFiles.map(f => (
                <li key={f.id} className="mb-1">
                  <span className="fw-bold">{f.name}</span> <span className="badge bg-info ms-2">{f.type}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Search Bar */}
      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control modern-card"
          style={{ maxWidth: 400, minWidth: 200, fontSize: 18, animation: 'fadeIn 0.7s' }}
          placeholder="Search files or folders..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {isLoading ? (
        <h1 className="display-1 my-5 text-center">Loading...</h1>
      ) : (
        <>
          <ShowItems
            title={"created Folders"}
            type={"folder"}
            items={filteredFolders}
          />
          <div className="d-flex justify-content-between align-items-center my-4">
            <h4 className="modern-heading mb-0">Files</h4>
            <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>
              Delete File(s)
            </button>
          </div>
          <UploadFile />
          {isFileLoading ? (
            <h2 className="text-center my-4">Loading files...</h2>
          ) : (
            <ShowItems title={"created Files"} type={"file"} items={filteredFiles} />
          )}
          {showDeleteModal && (
            <DeleteFileModal onClose={() => setShowDeleteModal(false)} />
          )}
        </>
      )}
    </div>
  );
};

export default HomeComponents;
