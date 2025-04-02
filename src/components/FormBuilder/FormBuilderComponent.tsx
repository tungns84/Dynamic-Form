// src/components/FormBuilder/FormBuilderComponent.tsx
import React from 'react';
import FormBuilderHeader from './components/FormBuilderHeader';
import FormBuilderCanvas from './components/FormBuilderCanvas';
import FormBuilderSettings from './components/FormBuilderSettings';
//import SaveFormModal from './components/SaveFormModal';
import WizardNavigation from './components/WizardNavigation';
import useFormBuilderState from './hooks/useFormBuilderState';
import { FormBuilderStep } from './types';

/**
 * Component chính để xây dựng form
 */
const FormBuilderComponent: React.FC = () => {
  // Sử dụng custom hook để quản lý state
  const {
    formSchema,
    formName,
    formDescription,
    currentStep,
    //showSaveModal,
    isSaving,
    saveError,
    isFormNameValid,
    componentCount,
    setFormName,
    setFormDescription,
    handleSchemaChange,
    //handleOpenSaveModal,
    //handleCloseSaveModal,
    handleSaveForm,
    handleNextStep,
    handlePrevStep,
    handleStepChange
  } = useFormBuilderState();

  return (
    <div className="container-fluid py-4">
      {/* Header với nút Save */}
      <FormBuilderHeader 
        title="Form Builder"
        description="Tạo và quản lý form động cho ứng dụng"
        //onSaveClick={handleOpenSaveModal}
      />
      
      {/* Thanh điều hướng wizard */}
      <WizardNavigation 
        currentStep={currentStep}
        onStepChange={handleStepChange}
        isFormNameValid={isFormNameValid}
        componentCount={componentCount}
      />
      
      {/* Hiển thị nội dung dựa trên bước hiện tại */}
      {currentStep === FormBuilderStep.CONFIGURE && (
        <FormBuilderSettings 
          formName={formName}
          formDescription={formDescription}
          onNameChange={setFormName}
          onDescriptionChange={setFormDescription}
          onNextClick={handleNextStep}
          isFormNameValid={isFormNameValid}
        />
      )}
      
      {currentStep === FormBuilderStep.DESIGN && (
        <FormBuilderCanvas 
          schema={formSchema}
          onChange={handleSchemaChange}
          onBackClick={handlePrevStep}
          onSaveForm={handleSaveForm} // Thêm prop này
          isSaving={isSaving}    
        />
      )}
      
      {/* Modal xác nhận lưu form */}
      {/* <SaveFormModal
        isOpen={showSaveModal}
        formName={formName}
        formDescription={formDescription}
        onNameChange={setFormName}
        onDescriptionChange={setFormDescription}
        onSave={handleSaveForm}
        onCancel={handleCloseSaveModal}
        isSaving={isSaving}
        error={saveError}
      /> */}

      {/* Hiển thị thông báo lỗi nếu có */}
      {saveError && (
        <div className="alert alert-danger mt-3">
          {saveError}
        </div>
      )}
      
      {/* CSS cho wizard */}
      <style dangerouslySetInnerHTML={{ __html: `
        .wizard-step {
          transition: all 0.3s ease;
        }
        
        .wizard-step:hover {
          background-color: #f0f0f0 !important;
        }
        
        .wizard-step.bg-primary:hover {
          background-color: #0d6efd !important;
        }
        
        .form-builder-container {
          min-height: 400px;
        }
        
        /* Animation cho chuyển bước */
        .card {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}}/>
    </div>
  );
};

export default FormBuilderComponent;