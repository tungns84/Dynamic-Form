import React, { useState } from 'react';
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
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const jsonString = JSON.stringify(sdmxData, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      setCopySuccess(true);
      // Reset copy success message after 2 seconds
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

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
          <div className="modal-header position-relative">
            <h5 className="modal-title">Dữ liệu SDMX</h5>
            <div style={{ 
              position: 'absolute', 
              left: '50%', 
              top: '50%', 
              transform: 'translate(-50%, -50%)'
            }}>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleCopy}
                title="Copy to clipboard"
              >
                {copySuccess ? (
                  <>
                    <i className="bi bi-check-lg me-1"></i>
                    Copied!
                  </>
                ) : (
                  <>
                    <i className="bi bi-clipboard me-1"></i>
                    Copy
                  </>
                )}
              </button>
            </div>
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