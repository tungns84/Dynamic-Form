// src/components/FormSelector/components/FormTabs.tsx
import React from 'react';
import { FormTabsProps, TabType } from '../types';

/**
 * Component hiển thị các tab (Nhập liệu, Bản nháp, Dữ liệu đã nhập)
 */
const FormTabs: React.FC<FormTabsProps> = ({
  activeTab,
  setActiveTab,
  draftsCount,
  submissionsCount,
  isLoading
}) => {
  return (
    <ul className="nav nav-tabs mb-3">
      <li className="nav-item">
        <button 
          className={`nav-link ${activeTab === TabType.INPUT ? 'active' : ''}`}
          onClick={() => setActiveTab(TabType.INPUT)}
          disabled={isLoading}
          type="button"
        >
          <i className="bi bi-pencil-square me-2"></i>
          Nhập liệu
        </button>
      </li>
      <li className="nav-item">
        <button 
          className={`nav-link ${activeTab === TabType.DRAFTS ? 'active' : ''}`}
          onClick={() => setActiveTab(TabType.DRAFTS)}
          disabled={isLoading}
          type="button"
        >
          <i className="bi bi-file-earmark-text me-2"></i>
          Bản nháp
          <span className="badge bg-secondary ms-2">{draftsCount}</span>
        </button>
      </li>
      <li className="nav-item">
        <button 
          className={`nav-link ${activeTab === TabType.SUBMISSIONS ? 'active' : ''}`}
          onClick={() => setActiveTab(TabType.SUBMISSIONS)}
          disabled={isLoading}
          type="button"
        >
          <i className="bi bi-database-check me-2"></i>
          Dữ liệu đã nhập
          <span className="badge bg-secondary ms-2">{submissionsCount}</span>
        </button>
      </li>
    </ul>
  );
};

export default FormTabs;