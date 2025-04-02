// src/components/FormBuilder/components/FormBuilderHeader.tsx
import React from 'react';
import { FormBuilderHeaderProps } from '../types';

/**
 * Header của Form Builder
 */
const FormBuilderHeader: React.FC<FormBuilderHeaderProps> = ({
  title,
  description,
  //onSaveClick
}) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="card-title mb-0 d-flex align-items-center">
              <i className="bi bi-building-gear me-2"></i>
              {title}
            </h2>
            {description && <p className="text-muted mb-0 mt-1">{description}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilderHeader;