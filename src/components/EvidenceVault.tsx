import React, { useRef, useState } from 'react';
import { Upload, File, CheckCircle } from 'lucide-react';
import './Components.css';

interface EvidenceVaultProps {
  onUpload: () => void;
  isProcessing: boolean;
  stage: string;
}

const EvidenceVault: React.FC<EvidenceVaultProps> = ({ onUpload, isProcessing, stage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadedFile(file.name);
    onUpload();
  };

  return (
    <div className="sidebar-section evidence-vault">
      <h3 className="section-title">Evidence Vault</h3>
      
      <div 
        className={`upload-zone ${isDragging ? 'dragging' : ''} ${isProcessing ? 'processing' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileSelect}
          disabled={isProcessing}
        />
        
        {isProcessing ? (
          <div className="processing-state">
            <div className="spinner"></div>
            <div className="stage-text text-accent glow-text">{stage}</div>
            <div className="pipeline-notice">SYNTHETIC DEMONSTRATION PIPELINE</div>
          </div>
        ) : uploadedFile ? (
          <div className="success-state">
            <CheckCircle className="text-acid-lime" size={32} />
            <div className="file-name">{uploadedFile}</div>
            <div className="upload-more">Click to upload more</div>
          </div>
        ) : (
          <div className="idle-state">
            <Upload size={32} className="upload-icon" />
            <div className="upload-text">DROP EVIDENCE OR BROWSE</div>
            <div className="supported-formats">PDF • DOC • IMG • AUD • VID</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvidenceVault;
