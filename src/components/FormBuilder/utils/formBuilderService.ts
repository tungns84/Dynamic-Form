// src/components/FormBuilder/utils/formBuilderService.ts
import axios from 'axios';
import { SavedForm } from '../types';

const API_URL = 'http://localhost:8080/api';

/**
 * Lưu form vào database
 * @param form Thông tin form cần lưu
 * @returns Form đã được lưu với ID
 */
export const saveForm = async (form: SavedForm): Promise<SavedForm> => {
  try {
    console.log('Sending request to save form:', form);

    const formToSave = {
      ...form,
      schema: typeof form.schema === 'string' ? form.schema : JSON.stringify(form.schema)
    };

    const response = await axios.post(`${API_URL}/forms`, formToSave);

    console.log('Form saved successfully, response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error saving form:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
      console.error('Status code:', error.response?.status);
      console.error('Headers:', error.response?.headers);
    }
    
    throw error;
  }
};

/**
 * Lấy danh sách form đã lưu
 * @returns Danh sách form
 */
export const getForms = async (): Promise<SavedForm[]> => {
  try {
    const response = await axios.get(`${API_URL}/forms`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forms:', error);
    throw error;
  }
};

/**
 * Lấy chi tiết form theo ID
 * @param id ID của form
 * @returns Chi tiết form
 */
export const getFormById = async (id: number): Promise<SavedForm> => {
  try {
    const response = await axios.get(`${API_URL}/forms/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching form with ID ${id}:`, error);
    throw error;
  }
};