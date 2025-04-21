// src/components/FormSelector/components/ViewDetailsModal.tsx
import React from 'react';
import { Form } from '@formio/react';
import { ViewDetailsModalProps } from '../types';

/**
 * Component modal hiển thị chi tiết dữ liệu
 */
const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({
  isOpen,
  selectedForm,
  submission,
  isLoading,
  onClose,
  onExportToPdf
}) => {
  if (!isOpen || !submission) return null;

  return (
    <div className="modal fade show" style={{ 
      display: 'block',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1050,
      overflow: 'auto'
    }} onClick={(e) => e.target === e.currentTarget && onClose()} tabIndex={-1}>
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" style={{
        position: 'relative',
        margin: '1.75rem auto',
        zIndex: 1055
      }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Chi tiết dữ liệu form: {selectedForm.name}</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <Form 
              {...{
                form: selectedForm.schema,
                submission: { data: submission.data },
                readOnly: true,
                options: {
                  viewAsHtml: true
                }
              } as any}
            />
          </div>
          <div className="modal-footer">
            <button 
              onClick={() => onExportToPdf(submission)}
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading && (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              )}
              Xuất PDF
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;