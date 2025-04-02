// src/components/FormSelector/components/FormSelectHeader.tsx
import React from 'react';
import { FormSelectHeaderProps } from '../types';

/**
 * Component hiển thị tiêu đề và dropdown chọn form
 */
const FormSelectHeader: React.FC<FormSelectHeaderProps> = ({
  forms,
  selectedForm,
  isLoading,
  onFormSelect
}) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-3">Chọn Form</h2>
        <select 
          className="form-select form-select-lg"
          value={selectedForm?.id?.toString() || ""}
          onChange={(e) => onFormSelect(e.target.value)}
          disabled={isLoading}
        >
          <option value="">-- Chọn form --</option>
          {forms.map(form => (
            <option key={form.id} value={form.id?.toString()}>
              {form.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FormSelectHeader;