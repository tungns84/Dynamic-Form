// src/components/FormSelector/components/InputTab.tsx
import React from 'react';
import { Form } from '@formio/react';
import { InputTabProps } from '../types';

/**
 * Component hiển thị tab nhập liệu
 */
const InputTab: React.FC<InputTabProps> = ({
  selectedForm,
  formData,
  progressPercent,
  isFormValid,
  formErrors,
  isEditing,
  currentSubmission,
  isLoading,
  onFormChange,
  onSubmit,
  onSaveFormData,
  onSaveDraft,
  onCancelEdit
}) => {
  // Tạo tiêu đề dựa trên trạng thái hiện tại
  const renderTitle = () => {
    if (isEditing && currentSubmission && currentSubmission.isDraft) {
      return 'Tiếp tục từ bản nháp';
    } else if (isEditing && currentSubmission) {
      return 'Chỉnh sửa dữ liệu';
    } else {
      return `Nhập dữ liệu cho form: ${selectedForm.name}`;
    }
  };

  return (
    <div className="tab-content p-3 border border-top-0 rounded-bottom">
      <h3 className="mb-3">{renderTitle()}</h3>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="d-flex justify-content-between mb-1">
          <span>Tiến độ hoàn thành:</span>
          <span className="fw-bold text-primary">{progressPercent}%</span>
        </div>
        <div className="progress" style={{ height: '10px' }}>
          <div 
            className={`progress-bar ${progressPercent === 100 ? 'bg-success' : 'bg-primary'}`}
            role="progressbar"
            style={{ width: `${progressPercent}%` }}
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
      </div>
      
      {/* Form Component */}
      <div className="card mb-4">
        <div className="card-body">
          <Form 
            {...{
              form: selectedForm.schema,
              submission: { data: formData },
              onChange: onFormChange,
              onSubmit: onSubmit,
              options: {
                noAlerts: true,
                buttonSettings: {
                  showSubmit: false
                }
              }
            } as any}
          />
          
          {/* Hiển thị lỗi nếu có */}
          {formErrors.length > 0 && (
            <div className="alert alert-danger mt-3">
              <h5 className="alert-heading">Lỗi cần sửa:</h5>
              <ul className="mb-0">
                {formErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Các nút thao tác */}
      <div className="d-flex gap-2">
        <button 
          onClick={onSaveFormData} 
          className="btn btn-primary"
          disabled={!isFormValid || isLoading}
        >
          {isLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
          {isEditing ? 'Cập nhật' : 'Lưu dữ liệu'}
        </button>
        
        <button 
          onClick={onSaveDraft} 
          className="btn btn-secondary"
          disabled={isLoading}
        >
          {isLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
          {isEditing && currentSubmission && currentSubmission.isDraft 
            ? 'Cập nhật bản nháp' 
            : 'Lưu tạm (Draft)'}
        </button>
        
        {isEditing && (
          <button 
            onClick={onCancelEdit} 
            className="btn btn-outline-dark"
            disabled={isLoading}
          >
            Hủy
          </button>
        )}
      </div>
    </div>
  );
};

export default InputTab;