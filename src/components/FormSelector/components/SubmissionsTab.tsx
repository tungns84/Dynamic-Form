// src/components/FormSelector/components/SubmissionsTab.tsx
import React from 'react';
import { SubmissionsTabProps } from '../types';

/**
 * Component hiển thị tab danh sách dữ liệu đã nhập
 */
const SubmissionsTab: React.FC<SubmissionsTabProps> = ({
  selectedForm,
  submissions,
  isLoading,
  onViewSubmission,
  onEditSubmission,
  onViewSdmxData,
  onExportToPdf
}) => {
  return (
    <div className="tab-content p-3 border border-top-0 rounded-bottom">
      <h3 className="mb-3">Dữ liệu đã nhập của form: {selectedForm.name}</h3>
      
      {submissions.length === 0 ? (
        <div className="alert alert-info text-center py-5">
          <i className="bi bi-info-circle fs-1 d-block mb-3"></i>
          <p className="mb-0">Chưa có dữ liệu nào được nhập. Hãy nhập và lưu dữ liệu từ tab "Nhập liệu".</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th style={{ width: '10%' }}>ID</th>
                <th style={{ width: '25%' }}>Ngày tạo</th>
                <th style={{ width: '65%' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(submission => (
                <tr key={submission.id}>
                  <td>{submission.id}</td>
                  <td>
                    {submission.createdAt 
                      ? new Date(submission.createdAt).toLocaleString('vi-VN')
                      : 'N/A'}
                  </td>
                  <td>
                    <div className="btn-group">
                      <button 
                        onClick={() => onViewSubmission(submission)} 
                        className="btn btn-sm btn-success"
                        disabled={isLoading}
                      >
                        <i className="bi bi-eye me-1"></i>
                        Chi tiết
                      </button>
                      <button 
                        onClick={() => onEditSubmission(submission)} 
                        className="btn btn-sm btn-primary"
                        disabled={isLoading}
                      >
                        <i className="bi bi-pencil-square me-1"></i>
                        Chỉnh sửa
                      </button>
                      <button 
                        onClick={() => onViewSdmxData(submission.id)} 
                        className="btn btn-sm btn-info text-white"
                        disabled={isLoading}
                      >
                        <i className="bi bi-code-square me-1"></i>
                        Xem SDMX
                      </button>
                      <button 
                        onClick={() => onExportToPdf(submission)} 
                        className="btn btn-sm btn-secondary"
                        disabled={isLoading}
                      >
                        <i className="bi bi-file-pdf me-1"></i>
                        Xuất PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubmissionsTab;