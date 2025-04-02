// src/components/FormBuilder/components/SaveFormModal.tsx
import React from 'react';
import { SaveFormModalProps } from '../types';

/**
 * Modal xác nhận lưu form
 */
const SaveFormModal: React.FC<SaveFormModalProps> = ({
  isOpen,
  formName,
  formDescription,
  onNameChange,
  onDescriptionChange,
  onSave,
  onCancel,
  isSaving,
  error
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
      <div className="modal-backdrop fade show" onClick={onCancel}></div>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Lưu Form</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onCancel}
              disabled={isSaving}
            ></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}
            
            <div className="mb-3">
              <label htmlFor="modalFormName" className="form-label">Tên Form <span className="text-danger">*</span></label>
              <input
                id="modalFormName"
                type="text"
                className="form-control"
                value={formName}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Nhập tên form"
                disabled={isSaving}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="modalFormDescription" className="form-label">Mô tả Form</label>
              <textarea
                id="modalFormDescription"
                className="form-control"
                value={formDescription}
                onChange={(e) => onDescriptionChange(e.target.value)}
                placeholder="Nhập mô tả cho form (tùy chọn)"
                rows={3}
                disabled={isSaving}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onCancel}
              disabled={isSaving}
            >
              Hủy
            </button>
            <button 
              type="button" 
              className="btn btn-success" 
              onClick={onSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Đang lưu...
                </>
              ) : 'Lưu Form ở đây à?'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveFormModal;