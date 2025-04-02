// src/components/FormBuilder/components/FormBuilderSettings.tsx
import React from 'react';
import { FormBuilderSettingsProps } from '../types';

/**
 * Component để cấu hình các thông tin cơ bản của form
 */
const FormBuilderSettings: React.FC<FormBuilderSettingsProps> = ({
  formName,
  formDescription,
  onNameChange,
  onDescriptionChange,
  onNextClick,
  isFormNameValid
}) => {
  return (
    <div className="card shadow-sm">
      {/* <div className="card-header bg-light">
        <h5 className="mb-0">
          <i className="bi bi-gear-fill me-2"></i>
          Cấu hình Form
        </h5>
      </div> */}
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="formName" className="form-label fw-bold">
            Tên Form <span className="text-danger">*</span>
          </label>
          <input
            id="formName"
            type="text"
            className={`form-control ${!isFormNameValid ? 'is-invalid' : ''}`}
            value={formName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Nhập tên form"
            required
          />
          {!isFormNameValid ? (
            <div className="invalid-feedback">
              Tên form không được để trống
            </div>
          ) : (
            <small className="text-muted d-block mt-1">
              Tên form sẽ được hiển thị trong danh sách form
            </small>
          )}
        </div>
        
        <div className="mb-3">
          <label htmlFor="formDescription" className="form-label fw-bold">Mô tả Form</label>
          <textarea
            id="formDescription"
            className="form-control"
            value={formDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Nhập mô tả cho form (tùy chọn)"
            rows={3}
          />
        </div>
        
        <div className="d-flex justify-content-end mt-4">
          <button 
            className="btn btn-primary d-flex align-items-center"
            onClick={onNextClick}
            disabled={!isFormNameValid}
          >
            Tiếp tục
            <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilderSettings;