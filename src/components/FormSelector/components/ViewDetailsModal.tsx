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
    <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
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