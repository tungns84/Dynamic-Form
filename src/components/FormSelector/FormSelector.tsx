// src/components/FormSelector/FormSelector.tsx
import React, { useState, useEffect } from 'react';
import FormSelectHeader from './components/FormSelectHeader';
import FormTabs from './components/FormTabs';
import InputTab from './components/InputTab';
import DraftsTab from './components/DraftsTab';
import SubmissionsTab from './components/SubmissionsTab';
import ViewDetailsModal from './components/ViewDetailsModal';
import SdmxModal from './components/SdmxModal';
import Notifications from './components/Notifications';
import useNotification from './hooks/useNotification';
import { calculateProgress, getSchemaComponents } from './utils/progressCalculator';
import { formApi } from './utils/apiService';
import { FormData, FormSchema, Submission, TabType } from './types';

/**
 * FormSelector Component - Quản lý toàn bộ form và dữ liệu liên quan
 */
const FormSelector: React.FC = () => {
  // === STATE DECLARATIONS ===
  // Form và các thông tin liên quan
  const [forms, setForms] = useState<FormData[]>([]);
  const [selectedForm, setSelectedForm] = useState<FormData | null>(null);
  
  // Submission và draft data
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [drafts, setDrafts] = useState<Submission[]>([]);
  const [currentSubmission, setCurrentSubmission] = useState<Submission | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  
  // Progress tracking
  const [progressPercent, setProgressPercent] = useState<number>(0);
  
  // Tab management
  const [activeTab, setActiveTab] = useState<TabType>(TabType.INPUT);
  
  // Modal và viewing states
  const [viewingSubmission, setViewingSubmission] = useState<Submission | null>(null);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  
  // Form validation
  const [isFormValid, setIsFormValid] = useState<boolean>(true); // Default to true for a new form
  const [formErrors, setFormErrors] = useState<string[]>([]);
  
  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Notification system
  const { notifications, showNotification } = useNotification();

  const [showSdmxModal, setShowSdmxModal] = useState<boolean>(false);
  const [sdmxData, setSdmxData] = useState<any>(null);

  // === EFFECTS ===
  /**
   * Lấy danh sách form khi component được mount
   */
  useEffect(() => {
    const fetchForms = async () => {
      try {
        setIsLoading(true);
        const data = await formApi.getForms();
        setForms(data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách form:', error);
        showNotification('error', 'Không thể tải danh sách form. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchForms();
  }, []);

  // === EVENT HANDLERS ===
  /**
   * Xử lý khi người dùng chọn một form từ dropdown
   */
  const handleFormSelect = async (formId: string) => {
    if (!formId) {
      setSelectedForm(null);
      return;
    }
    
    try {
      setIsLoading(true);
      const formData = await formApi.getFormById(formId);
      
      // Chuyển đổi schema từ string sang object nếu cần
      const parsedSchema = typeof formData.schema === 'string' 
        ? JSON.parse(formData.schema) as FormSchema
        : formData.schema;
      
      setSelectedForm({
        ...formData,
        schema: parsedSchema
      });
      
      // Reset các state liên quan
      setProgressPercent(0);
      setFormData({});
      
      // Lấy submissions của form này
      const submissions = await formApi.getSubmissions(formId);
      setSubmissions(submissions);
      
      // Lấy drafts của form này
      const drafts = await formApi.getDrafts(formId);
      setDrafts(drafts);
      
      // Reset các state edit/view và về tab mặc định là INPUT
      setCurrentSubmission(null);
      setIsEditing(false);
      setViewingSubmission(null);
      setShowViewModal(false);
      setActiveTab(TabType.INPUT);
      setIsFormValid(true);
      setFormErrors([]);
      
      showNotification('success', `Form "${formData.name}" đã được tải.`);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin form:', error);
      showNotification('error', 'Không thể tải form. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Xử lý khi form thay đổi để cập nhật progress bar và trạng thái validation
   */
  const handleFormChange = (changed: any) => {
    const newData = changed.data || {};
    setFormData(newData);
    
    // Cập nhật progress bar
    if (selectedForm) {
      const components = getSchemaComponents(selectedForm.schema);
      if (components) {
        const progress = calculateProgress(newData, components);
        setProgressPercent(progress);
      }
    }
    
    // Kiểm tra tính hợp lệ của form
    setIsFormValid(!changed.isInvalid);
    setFormErrors(changed.errors || []);
  };

  /**
   * Lưu tạm form dưới dạng draft
   */
  const handleSaveDraft = async () => {
    if (!selectedForm?.id) {
      showNotification('warning', 'Vui lòng chọn form trước khi lưu tạm.');
      return;
    }
    
    if (Object.keys(formData).length === 0) {
      showNotification('warning', 'Vui lòng nhập thông tin trước khi lưu tạm.');
      return;
    }
    
    try {
      setIsLoading(true);
      // Nếu đang edit draft hiện tại
      if (isEditing && currentSubmission && currentSubmission.isDraft) {
        await formApi.updateDraft(
          currentSubmission.id as number,
          selectedForm.id.toString(),
          formData,
          progressPercent
        );
        
        showNotification('success', 'Đã cập nhật bản nháp thành công!');
      } else {
        // Tạo draft mới
        await formApi.createDraft(
          selectedForm.id.toString(),
          formData,
          progressPercent
        );
        
        showNotification('success', 'Đã lưu bản nháp thành công!');
      }
      
      // Refresh danh sách drafts
      const updatedDrafts = await formApi.getDrafts(selectedForm.id.toString());
      setDrafts(updatedDrafts);
      
      // Reset state nếu là draft mới
      if (!(isEditing && currentSubmission && currentSubmission.isDraft)) {
        setFormData({});
        setProgressPercent(0);
        setCurrentSubmission(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Lỗi khi lưu bản nháp:', error);
      showNotification('error', 'Lỗi khi lưu bản nháp! Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Lưu dữ liệu form
   */
  const handleSaveFormData = async () => {
    if (!selectedForm?.id) {
      showNotification('warning', 'Vui lòng chọn form trước khi lưu.');
      return;
    }
    
    // Kiểm tra dữ liệu có hợp lệ không
    if (!isFormValid) {
      showNotification('warning', 'Form chứa lỗi, vui lòng kiểm tra lại.');
      return;
    }
    
    try {
      setIsLoading(true);
      if (isEditing && currentSubmission && !currentSubmission.isDraft) {
        // Cập nhật submission đã tồn tại
        await formApi.updateSubmission(
          currentSubmission.id as number,
          selectedForm.id.toString(),
          formData
        );
        
        showNotification('success', 'Dữ liệu đã được cập nhật thành công!');
      } else if (isEditing && currentSubmission && currentSubmission.isDraft) {
        // Chuyển draft thành submission
        await formApi.createSubmission(
          selectedForm.id.toString(),
          formData,
          currentSubmission.id
        );
        
        showNotification('success', 'Bản nháp đã được lưu thành dữ liệu chính thức!');
      } else {
        // Tạo submission mới
        await formApi.createSubmission(
          selectedForm.id.toString(),
          formData
        );
        
        showNotification('success', 'Dữ liệu mới đã được lưu thành công!');
      }
      
      // Cập nhật lại danh sách submissions
      const updatedSubmissions = await formApi.getSubmissions(selectedForm.id.toString());
      setSubmissions(updatedSubmissions);
      
      // Cập nhật lại danh sách drafts nếu đã submit từ draft
      if (isEditing && currentSubmission && currentSubmission.isDraft) {
        const updatedDrafts = await formApi.getDrafts(selectedForm.id.toString());
        setDrafts(updatedDrafts);
      }
      
      // Reset state
      setCurrentSubmission(null);
      setIsEditing(false);
      setFormData({});
      setProgressPercent(0);
      
      // Chuyển sang tab submissions để xem kết quả
      setActiveTab(TabType.SUBMISSIONS);
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu:', error);
      showNotification('error', 'Có lỗi xảy ra khi lưu dữ liệu!');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Xử lý khi FormIO tự động submit
   */
  const handleSubmit = (submission: { data: any }) => {
    // Cập nhật dữ liệu form rồi gọi hàm lưu
    setFormData(submission.data);
    handleSaveFormData();
  };

  /**
   * Xử lý khi người dùng muốn chỉnh sửa một submission
   */
  const handleEditSubmission = (submission: Submission) => {
    setCurrentSubmission(submission);
    setIsEditing(true);
    setFormData(submission.data || {});
    
    // Cập nhật progress
    if (selectedForm) {
      const components = getSchemaComponents(selectedForm.schema);
      if (components) {
        const progress = calculateProgress(submission.data || {}, components);
        setProgressPercent(progress);
      }
    }
    
    // Chuyển về tab nhập liệu
    setActiveTab(TabType.INPUT);
    
    // Form đã lưu coi như hợp lệ
    setIsFormValid(true);
    setFormErrors([]);
  };

  /**
   * Xử lý khi người dùng muốn tiếp tục từ một draft
   */
  const handleEditDraft = (draft: Submission) => {
    setCurrentSubmission({...draft, isDraft: true});
    setIsEditing(true);
    setFormData(draft.data || {});
    setProgressPercent(draft.progressPercent || 0);
    
    // Chuyển về tab nhập liệu
    setActiveTab(TabType.INPUT);
    
    // Draft coi như hợp lệ
    setIsFormValid(true);
    setFormErrors([]);
  };

  /**
   * Xử lý khi người dùng muốn xóa một draft
   */
  const handleDeleteDraft = async (draftId: number | undefined) => {
    if (!draftId || !selectedForm?.id) return;
    
    if (!window.confirm('Bạn có chắc muốn xóa bản nháp này?')) return;
    
    try {
      setIsLoading(true);
      await formApi.deleteDraft(draftId);
      
      // Refresh danh sách drafts
      const updatedDrafts = await formApi.getDrafts(selectedForm.id.toString());
      setDrafts(updatedDrafts);
      
      if (currentSubmission && currentSubmission.id === draftId) {
        setCurrentSubmission(null);
        setIsEditing(false);
        setFormData({});
        setProgressPercent(0);
      }
      
      showNotification('success', 'Đã xóa bản nháp thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa bản nháp:', error);
      showNotification('error', 'Lỗi khi xóa bản nháp! Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Xem dữ liệu SDMX đã được chuyển đổi
   */
  const handleViewSdmxData = async (submissionId: number | undefined) => {
    if (!submissionId) return;
    
    try {
      setIsLoading(true);
      const data = await formApi.getSdmxData(submissionId);
      setSdmxData(data);
      setShowSdmxModal(true);
      showNotification('success', 'Dữ liệu SDMX đã được tải thành công.');
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu SDMX:', error);
      showNotification('error', 'Không thể lấy dữ liệu SDMX! Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSdmxModal = () => {
    setShowSdmxModal(false);
    setSdmxData(null);
  };

  /**
   * Mở modal xem chi tiết submission
   */
  const handleViewSubmission = (submission: Submission) => {
    setViewingSubmission(submission);
    setShowViewModal(true);
  };

  /**
   * Đóng modal xem chi tiết
   */
  const handleCloseViewModal = () => {
    setViewingSubmission(null);
    setShowViewModal(false);
  };

  /**
   * Xuất dữ liệu form sang PDF
   */
  const handleExportToPdf = async (submission: Submission) => {
    if (!submission.id) return;
    
    try {
      setIsLoading(true);
      const pdfBlob = await formApi.exportToPdf(submission.id);
      
      // Tạo URL từ blob trả về
      const url = window.URL.createObjectURL(pdfBlob);
      
      // Tạo link tạm thời để tải xuống
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `form-data-${submission.id}.pdf`);
      document.body.appendChild(link);
      
      // Kích hoạt tải xuống
      link.click();
      
      // Dọn dẹp
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }, 100);
      
      showNotification('success', 'File PDF đã được tải xuống thành công!');
    } catch (error) {
      console.error('Lỗi khi xuất PDF:', error);
      showNotification('error', 'Không thể xuất PDF! Vui lòng kiểm tra nếu backend hỗ trợ chức năng này.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handler hủy chỉnh sửa
   */
  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentSubmission(null);
    setFormData({});
    setProgressPercent(0);
  };

  // === RENDER COMPONENT ===
  return (
    <div className="container-fluid py-4">
      {/* Loading indicator */}
      {isLoading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75" style={{ zIndex: 1050 }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
      {/* Form selector */}
      <FormSelectHeader 
        forms={forms}
        selectedForm={selectedForm}
        isLoading={isLoading}
        onFormSelect={handleFormSelect}
      />
      
      {/* Content area - only show if a form is selected */}
      {selectedForm && (
        <div className="card shadow-sm">
          {/* Tabs */}
          <div className="card-header bg-white p-0">
            <FormTabs 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              draftsCount={drafts.length}
              submissionsCount={submissions.length}
              isLoading={isLoading}
            />
          </div>
          
          {/* Tab content */}
          <div className="card-body p-0">
            {/* Input tab */}
            {activeTab === TabType.INPUT && (
              <InputTab 
                selectedForm={selectedForm}
                formData={formData}
                progressPercent={progressPercent}
                isFormValid={isFormValid}
                formErrors={formErrors}
                isEditing={isEditing}
                currentSubmission={currentSubmission}
                isLoading={isLoading}
                onFormChange={handleFormChange}
                onSubmit={handleSubmit}
                onSaveFormData={handleSaveFormData}
                onSaveDraft={handleSaveDraft}
                onCancelEdit={handleCancelEdit}
              />
            )}
            
            {/* Drafts tab */}
            {activeTab === TabType.DRAFTS && (
              <DraftsTab 
                selectedForm={selectedForm}
                drafts={drafts}
                isLoading={isLoading}
                onEditDraft={handleEditDraft}
                onDeleteDraft={handleDeleteDraft}
              />
            )}
            
            {/* Submissions tab */}
            {activeTab === TabType.SUBMISSIONS && (
              <SubmissionsTab 
                selectedForm={selectedForm}
                submissions={submissions}
                isLoading={isLoading}
                onViewSubmission={handleViewSubmission}
                onEditSubmission={handleEditSubmission}
                onViewSdmxData={handleViewSdmxData}
                onExportToPdf={handleExportToPdf}
              />
            )}
          </div>
        </div>
      )}
      
      {/* View details modal */}
      <ViewDetailsModal 
        isOpen={showViewModal}
        selectedForm={selectedForm as FormData}
        submission={viewingSubmission}
        isLoading={isLoading}
        onClose={handleCloseViewModal}
        onExportToPdf={handleExportToPdf}
      />

      {/* SDMX data modal */}
      <SdmxModal
        isOpen={showSdmxModal}
        sdmxData={sdmxData}
        onClose={handleCloseSdmxModal}
      />
      
      {/* Notifications */}
      <Notifications notifications={notifications} />
    </div>
  );
};

export default FormSelector;