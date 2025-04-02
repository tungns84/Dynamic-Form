// src/components/FormSelector/components/DraftsTab.tsx
import React from 'react';
import { DraftsTabProps } from '../types';

/**
 * Component hiển thị tab danh sách bản nháp
 */
const DraftsTab: React.FC<DraftsTabProps> = ({
  selectedForm,
  drafts,
  isLoading,
  onEditDraft,
  onDeleteDraft
}) => {
  return (
    <div className="tab-content p-3 border border-top-0 rounded-bottom">
      <h3 className="mb-3">Bản nháp của form: {selectedForm.name}</h3>
      
      {drafts.length === 0 ? (
        <div className="alert alert-info text-center py-5">
          <i className="bi bi-info-circle fs-1 d-block mb-3"></i>
          <p className="mb-0">Chưa có bản nháp nào. Bạn có thể lưu tạm dữ liệu đang nhập để tiếp tục sau.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th style={{ width: '5%' }}>ID</th>
                <th style={{ width: '20%' }}>Ngày tạo</th>
                <th style={{ width: '45%' }}>Tiến độ</th>
                <th style={{ width: '30%' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {drafts.map(draft => (
                <tr key={draft.id}>
                  <td>{draft.id}</td>
                  <td>
                    {draft.createdAt 
                      ? new Date(draft.createdAt).toLocaleString('vi-VN')
                      : 'N/A'}
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="progress flex-grow-1" style={{ height: '10px' }}>
                        <div 
                          className={`progress-bar ${(draft.progressPercent || 0) === 100 ? 'bg-success' : 'bg-primary'}`}
                          role="progressbar"
                          style={{ width: `${draft.progressPercent || 0}%` }}
                          aria-valuenow={draft.progressPercent || 0}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                      <span>{draft.progressPercent || 0}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button 
                        onClick={() => onEditDraft(draft)} 
                        className="btn btn-sm btn-primary"
                        disabled={isLoading}
                      >
                        <i className="bi bi-pencil-square me-1"></i>
                        Tiếp tục
                      </button>
                      <button 
                        onClick={() => onDeleteDraft(draft.id)} 
                        className="btn btn-sm btn-danger"
                        disabled={isLoading}
                      >
                        <i className="bi bi-trash me-1"></i>
                        Xóa
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

export default DraftsTab;