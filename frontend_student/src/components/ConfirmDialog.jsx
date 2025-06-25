import React from 'react';

function ConfirmDialog({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="dialog-backdrop">
      <div className="dialog-box">
        <div>{message}</div>
        <div style={{ marginTop: 16 }}>
          <button onClick={onConfirm} className="confirm-btn">Yes</button>
          <button onClick={onCancel} className="cancel-btn">No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
