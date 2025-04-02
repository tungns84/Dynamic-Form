// src/components/FormBuilder/components/WizardNavigation.tsx
import React from 'react';
import { WizardNavigationProps, FormBuilderStep } from '../types';

/**
 * Component hiển thị thanh điều hướng wizard
 */
const WizardNavigation: React.FC<WizardNavigationProps> = ({
  currentStep,
  onStepChange,
  isFormNameValid,
  componentCount
}) => {
  // Cấu hình các bước
  const steps = [
    { id: FormBuilderStep.CONFIGURE, label: 'Cấu hình Form', icon: 'gear-fill' },
    { id: FormBuilderStep.DESIGN, label: 'Thiết kế Form', icon: 'pencil-square' }
  ];

  // Xác định trạng thái của mỗi bước
  const getStepStatus = (stepId: FormBuilderStep) => {
    if (stepId === currentStep) return 'active';
    
    if (stepId === FormBuilderStep.CONFIGURE) {
      return isFormNameValid ? 'completed' : 'incomplete';
    }
    
    if (stepId === FormBuilderStep.DESIGN) {
      if (currentStep === FormBuilderStep.DESIGN) return 'active';
      return componentCount > 0 ? 'completed' : 'incomplete';
    }
    
    return 'incomplete';
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body p-0">
        <div className="d-flex flex-column flex-md-row">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const isCompleted = status === 'completed';
            const isActive = status === 'active';
            
            // Xác định styles dựa vào trạng thái
            const stepClass = isActive 
              ? 'bg-primary text-white' 
              : isCompleted 
                ? 'bg-light text-primary' 
                : 'bg-light text-muted';
            
            // Hiển thị chỉ số hoặc icon check nếu đã hoàn thành
            const stepIndicator = isCompleted 
              ? <i className="bi bi-check-circle-fill"></i>
              : <span className="fw-bold">{index + 1}</span>;

            return (
              <div 
                key={step.id} 
                className={`wizard-step flex-grow-1 p-3 ${stepClass} ${index < steps.length - 1 ? 'border-end' : ''}`}
                onClick={() => {
                  // Chỉ cho phép chuyển về bước đã hoàn thành hoặc bước hiện tại
                  if (isActive || isCompleted) {
                    onStepChange(step.id);
                  }
                }}
                style={{ cursor: (isActive || isCompleted) ? 'pointer' : 'not-allowed' }}
              >
                <div className="d-flex align-items-center">
                  {/* Chỉ số bước hoặc icon hoàn thành */}
                  <div className={`step-number rounded-circle d-flex align-items-center justify-content-center me-2 ${isActive ? 'bg-white text-primary' : 'bg-primary text-white'}`}
                    style={{ width: '30px', height: '30px', flexShrink: 0 }}>
                    {stepIndicator}
                  </div>
                  
                  {/* Nội dung bước */}
                  <div>
                    <h6 className="mb-0">
                      <i className={`bi bi-${step.icon} me-2`}></i>
                      {step.label}
                    </h6>
                    <small className={isActive ? 'text-white-50' : 'text-muted'}>
                      {step.id === FormBuilderStep.CONFIGURE 
                        ? isFormNameValid ? 'Đã đặt tên form' : 'Cần đặt tên form' 
                        : `${componentCount} components`}
                    </small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Thanh tiến trình */}
        <div className="progress" style={{ height: '4px', borderRadius: 0 }}>
          <div 
            className="progress-bar" 
            role="progressbar" 
            style={{ 
              width: currentStep === FormBuilderStep.CONFIGURE ? '50%' : '100%',
              backgroundColor: '#0d6efd'
            }} 
            aria-valuenow={currentStep === FormBuilderStep.CONFIGURE ? 50 : 100} 
            aria-valuemin={0} 
            aria-valuemax={100}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WizardNavigation;