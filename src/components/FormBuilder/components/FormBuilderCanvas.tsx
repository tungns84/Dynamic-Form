// src/components/FormBuilder/components/FormBuilderCanvas.tsx
import React from 'react';
import { FormBuilder } from '@formio/react';
import { FormBuilderCanvasProps } from '../types';

/**
 * Canvas chứa Form Builder của FormIO
 */
const FormBuilderCanvas: React.FC<FormBuilderCanvasProps> = ({
  schema,
  isSaving,
  onChange,
  onBackClick,
  onSaveForm
}) => {
  // Đếm số components trong form
  const componentCount = schema.components?.length || 0;

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-pencil-square me-2"></i>
          Thiết kế Form
          {/* Badge hiển thị số components */}
          <span className="badge bg-primary ms-2">
            {componentCount} component{componentCount !== 1 ? 's' : ''}
          </span>
        </h5>
      </div>
      
      <div className="card-body p-0">
        {/* Empty state nếu không có components */}
        {componentCount === 0 && (
          <div className="bg-light p-4 text-center m-3 rounded border">
            <i className="bi bi-grid-3x3-gap-fill text-muted" style={{ fontSize: '2rem' }}></i>
            <p className="mt-3 mb-0 text-muted">
              Kéo và thả các components từ sidebar vào đây để tạo form
            </p>
          </div>
        )}
        
        <div className="form-builder-container p-3">
          <FormBuilder 
            {...{
              form: schema,
              onChange: onChange
            } as any}
          />
        </div>
      </div>
      
      <div className="card-footer bg-light d-flex justify-content-between">
        <button 
          className="btn btn-outline-secondary d-flex align-items-center"
          onClick={onBackClick}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Quay lại Cấu hình
        </button>
        
        {/* Thêm nút hoàn thành và lưu */}
        <button 
          className="btn btn-success d-flex align-items-center"
          onClick={onSaveForm}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Đang lưu...
            </>
          ) : (
            <>
              <i className="bi bi-check-circle me-2"></i>
              Hoàn thành & Lưu
            </>
          )}
        </button>
      </div>

    </div>
  );
};

export default FormBuilderCanvas;