import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFile, faImage, faVideo, faFileAlt, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react';
import FileModal from './FileModal';
import ShareModal from './ShareModal';
import "./ShowItems.css";

const ShowItems = ({ title, items, type }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [shareItem, setShareItem] = useState(null);

  const getFileIcon = (file) => {
    if (file.type?.startsWith('image')) return faImage;
    if (file.type?.startsWith('video')) return faVideo;
    if (file.type === 'text') return faFileAlt;
    return faFile;
  };

  return (
    <div className="w-100">
      <h4 className="text-center border-bottom">{title}</h4>
      <div className="row gap-2 p-4 flex-wrap">
        {items && items.map((item, index) => (
          <div
            key={item.id || index}
            className="col-md-2 py-3 text-center d-flex flex-column border modern-card position-relative"
            style={{ cursor: type === 'file' ? 'pointer' : 'default', animation: 'fadeInUp 0.5s' }}
            onClick={() => type === 'file' ? setSelectedFile(item) : undefined}
          >
            {type === "folder" ? (
              <FontAwesomeIcon icon={faFolder} size="4x" className="mb-3" />
            ) : (
              <FontAwesomeIcon icon={getFileIcon(item)} size="3x" className="mb-3" />
            )}
            <div className="fw-bold mb-2">{item?.name}</div>
            {/* Preview for image/video files */}
            {type === 'file' && item.storageUrl && item.type?.startsWith('image') && (
              <img src={item.storageUrl} alt={item.name} style={{ width: '100%', maxHeight: 80, objectFit: 'cover', borderRadius: 8 }} />
            )}
            {type === 'file' && item.storageUrl && item.type?.startsWith('video') && (
              <video src={item.storageUrl} controls style={{ width: '100%', maxHeight: 80, borderRadius: 8 }} />
            )}
            <button
              className="btn btn-outline-info btn-sm mt-2 animated-link"
              style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}
              onClick={e => { e.stopPropagation(); setShareItem(item); }}
              aria-label="Share"
            >
              <FontAwesomeIcon icon={faShareAlt} />
            </button>
          </div>
        ))}
      </div>
      {/* File Modal for viewing/editing */}
      {selectedFile && (
        <FileModal file={selectedFile} onClose={() => setSelectedFile(null)} />
      )}
      {/* Share Modal for files/folders */}
      {shareItem && (
        <ShareModal item={shareItem} type={type} onClose={() => setShareItem(null)} />
      )}
    </div>
  );
};

export default ShowItems;
