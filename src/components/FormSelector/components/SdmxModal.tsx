import React from 'react';
import Editor from "@monaco-editor/react";

interface SdmxModalProps {
  isOpen: boolean;
  sdmxData: any;
  onClose: () => void;
}

const SdmxModal: React.FC<SdmxModalProps> = ({
  isOpen,
  sdmxData,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ 
      display: 'block',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1050,
      overflow: 'auto'
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" style={{
        position: 'relative',
        margin: '1.75rem auto',
        zIndex: 1055,
        width: '90%',
        maxWidth: '1200px'
      }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Dữ liệu SDMX</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-0">
            <Editor
              height="70vh"
              defaultLanguage="json"
              defaultValue={JSON.stringify(sdmxData, null, 2)}
              options={{
                readOnly: true,
                minimap: { enabled: true },
                folding: true,
                foldingStrategy: 'indentation',
                renderValidationDecorations: 'off',
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                formatOnPaste: true,
                formatOnType: true
              }}
              theme="vs-light"
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SdmxModal; 