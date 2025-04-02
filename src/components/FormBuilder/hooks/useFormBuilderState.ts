// src/components/FormBuilder/hooks/useFormBuilderState.ts
import { useState, useCallback, useEffect } from 'react';
import { FormBuilderSchema, SavedForm, FormBuilderStep } from '../types';
import { saveForm } from '../utils/formBuilderService';
import axios from 'axios';
/**
 * Custom hook để quản lý state của FormBuilder
 */
const useFormBuilderState = () => {
  // State cho schema của form
  const [formSchema, setFormSchema] = useState<FormBuilderSchema>({
    display: 'form',
    components: []
  });
  
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  // State cho thông tin cơ bản của form
  const [formName, setFormName] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  
  // State cho wizard
  const [currentStep, setCurrentStep] = useState<FormBuilderStep>(FormBuilderStep.CONFIGURE);
  
  // State cho modal lưu form
  //const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  
  // State cho loading và error
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | undefined>(undefined);
  
  // State để theo dõi form đã lưu
  const [savedForm, setSavedForm] = useState<SavedForm | null>(null);

  // Kiểm tra form name có hợp lệ không
  const isFormNameValid = formName.trim().length > 0;
  
  // Đếm số component
  const componentCount = formSchema.components?.length || 0;

  /**
   * Cập nhật schema khi form builder thay đổi
   */
  const handleSchemaChange = useCallback((schema: FormBuilderSchema) => {
    console.log('Schema changed:', schema);
    setFormSchema(schema);
    forceUpdate(); // Force re-render khi schema thay đổi
  }, [forceUpdate]);

  /**
   * Mở modal lưu form
   */
  // const handleOpenSaveModal = useCallback(() => {
  //   if (!isFormNameValid) {
  //     // Nếu tên form không hợp lệ, chuyển về bước cấu hình
  //     setCurrentStep(FormBuilderStep.CONFIGURE);
  //     return;
  //   }
  //   setShowSaveModal(true);
  // }, [isFormNameValid]);

  // /**
  //  * Đóng modal lưu form
  //  */
  // const handleCloseSaveModal = useCallback(() => {
  //   setShowSaveModal(false);
  //   setSaveError(undefined);
  // }, []);

  /**
   * Lưu form vào database
   */
    const handleSaveForm = useCallback(async () => {
      // Kiểm tra tên form
      if (!formName.trim()) {
        setSaveError('Vui lòng nhập tên form');
        setCurrentStep(FormBuilderStep.CONFIGURE); // Quay lại bước cấu hình nếu tên không hợp lệ
        return;
      }

      // Kiểm tra có components trong form không
      if (!formSchema.components || formSchema.components.length === 0) {
        setSaveError('Form cần có ít nhất một component');
        return;
      }

      try {
        setIsSaving(true);
        setSaveError(undefined);
        
        console.log('Saving form with data:', {
          name: formName,
          description: formDescription,
          schema: formSchema
        });
        
        // Tạo payload để lưu
        const formData: SavedForm = {
          name: formName,
          description: formDescription,
          schema: formSchema  // Truyền formSchema trực tiếp
        };

        // Gọi API lưu form
        const result = await saveForm(formData);

        // Cập nhật state với form đã lưu
        setSavedForm(result);

        // Hiển thị thông báo thành công - có thể dùng toast hoặc alert
        alert('Form đã được lưu thành công với ID: ' + result.id);
        
        // Tùy chọn: chuyển đến trang danh sách form hoặc trang xem form
        // window.location.href = `/forms/${result.id}`;
        
      } catch (error) {
        console.error('Lỗi khi lưu form:', error);
        
        // Hiển thị thông báo lỗi chi tiết hơn
        if (axios.isAxiosError(error)) {
          setSaveError(`Lỗi khi lưu: ${error.response?.data?.message || error.message || 'Không thể kết nối tới server'}`);
        } else {
          setSaveError('Không thể lưu form. Vui lòng thử lại sau.');
        }
      } finally {
        setIsSaving(false);
      }
    }, [formName, formDescription, formSchema]);

  // Các hàm điều hướng wizard
  const handleNextStep = useCallback(() => {
    if (currentStep === FormBuilderStep.CONFIGURE && isFormNameValid) {
      setCurrentStep(FormBuilderStep.DESIGN);
    }
  }, [currentStep, isFormNameValid]);

  const handlePrevStep = useCallback(() => {
    if (currentStep === FormBuilderStep.DESIGN) {
      setCurrentStep(FormBuilderStep.CONFIGURE);
    }
  }, [currentStep]);

  const handleStepChange = useCallback((step: FormBuilderStep) => {
    // Kiểm tra điều kiện chuyển bước
    if (step === FormBuilderStep.DESIGN && !isFormNameValid) {
      return;
    }
    setCurrentStep(step);
  }, [isFormNameValid]);

  // Lưu trạng thái bước hiện tại vào localStorage
  useEffect(() => {
    localStorage.setItem('formBuilderCurrentStep', currentStep);
  }, [currentStep]);

  // Khôi phục trạng thái từ localStorage khi component mount
  useEffect(() => {
    const savedStep = localStorage.getItem('formBuilderCurrentStep') as FormBuilderStep | null;
    if (savedStep && (savedStep === FormBuilderStep.CONFIGURE || savedStep === FormBuilderStep.DESIGN)) {
      setCurrentStep(savedStep);
    }
  }, []);

  return {
    formSchema,
    formName,
    formDescription,
    currentStep,
    //showSaveModal,
    isSaving,
    saveError,
    savedForm,
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
    handleStepChange,
    forceUpdate
  };
};

export default useFormBuilderState;