// src/components/FormSelector/utils/apiService.ts
import axios from 'axios';
import { FormData, Submission } from '../types';

const API_URL = 'http://localhost:8080/api';

/**
 * Service class để gọi API
 */
export const formApi = {
  /**
   * Lấy danh sách form
   */
  getForms: async (): Promise<FormData[]> => {
    const response = await axios.get(`${API_URL}/forms`);
    return response.data;
  },
  
  /**
   * Lấy thông tin chi tiết form
   */
  getFormById: async (formId: string): Promise<FormData> => {
    const response = await axios.get(`${API_URL}/forms/${formId}`);
    return response.data;
  },
  
  /**
   * Lấy submissions của form
   */
  getSubmissions: async (formId: string): Promise<Submission[]> => {
    const response = await axios.get(`${API_URL}/submissions/forms/${formId}`);
    return response.data;
  },
  
  /**
   * Lấy drafts của form
   */
  getDrafts: async (formId: string): Promise<Submission[]> => {
    const response = await axios.get(`${API_URL}/drafts/forms/${formId}`);
    return response.data;
  },
  
  /**
   * Tạo submission mới
   */
  createSubmission: async (formId: string, data: any, draftId?: number): Promise<Submission> => {
    const payload = { formId, data, draftId };
    const response = await axios.post(`${API_URL}/submissions`, payload);
    return response.data;
  },
  
  /**
   * Cập nhật submission
   */
  updateSubmission: async (submissionId: number, formId: string, data: any): Promise<Submission> => {
    const payload = { formId, data };
    const response = await axios.put(`${API_URL}/submissions/${submissionId}`, payload);
    return response.data;
  },
  
  /**
   * Tạo draft mới
   */
  createDraft: async (formId: string, data: any, progressPercent: number): Promise<Submission> => {
    const payload = { formId, data, progressPercent };
    const response = await axios.post(`${API_URL}/drafts`, payload);
    return response.data;
  },
  
  /**
   * Cập nhật draft
   */
  updateDraft: async (draftId: number, formId: string, data: any, progressPercent: number): Promise<Submission> => {
    const payload = { formId, data, progressPercent };
    const response = await axios.put(`${API_URL}/drafts/${draftId}`, payload);
    return response.data;
  },
  
  /**
   * Xóa draft
   */
  deleteDraft: async (draftId: number): Promise<void> => {
    await axios.delete(`${API_URL}/drafts/${draftId}`);
  },
  
  /**
   * Lấy dữ liệu SDMX của submission
   */
  getSdmxData: async (submissionId: number): Promise<any> => {
    const response = await axios.get(`${API_URL}/sdmx-data/submission/${submissionId}`);
    return response.data;
  },
  
  /**
   * Xuất PDF từ submission
   */
  exportToPdf: async (submissionId: number): Promise<Blob> => {
    const response = await axios.get(`${API_URL}/submissions/${submissionId}/pdf`, { 
      responseType: 'blob' 
    });
    return response.data;
  }
};