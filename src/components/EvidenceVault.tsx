import React, { useRef, useState } from 'react';
import { Upload, CheckCircle2, FileText, FileSpreadsheet, Image as ImageIcon, Film, FileCheck } from 'lucide-react';
import './Components.css';

interface EvidenceVaultProps {
  onUpload: (fileName?: string) => void;
  isProcessing: boolean;
  stage: string;
  progressPercent?: number;
}

const EvidenceVault: React.FC<EvidenceVaultProps> = ({ onUpload, isProcessing, stage, progressPercent = 0 }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string } | null>(null);

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
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    setUploadedFile({
      name: file.name,
      size: `${sizeInMB === '0.00' ? '1.80' : sizeInMB} MB`,
      type: file.type || 'PDF Document'
    });
    onUpload(file.name);
  };

  const handleSamplePdfClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile({
      name: 'TRACEIQ_SYNTHETIC_EVIDENCE_PACKAGE.pdf',
      size: '1.80 MB',
      type: 'PDF Document'
    });
    onUpload('TRACEIQ_SYNTHETIC_EVIDENCE_PACKAGE.pdf');
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf' || ext === 'doc' || ext === 'docx') return <FileText size={24} className="text-acid-lime" />;
    if (ext === 'csv' || ext === 'xlsx') return <FileSpreadsheet size={24} className="text-acid-lime" />;
    if (ext === 'jpg' || ext === 'png' || ext === 'jpeg') return <ImageIcon size={24} className="text-acid-lime" />;
    if (ext === 'mp4' || ext === 'avi' || ext === 'mov') return <Film size={24} className="text-acid-lime" />;
    return <FileText size={24} className="text-acid-lime" />;
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
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.mp4,.mp3,.csv"
          disabled={isProcessing}
        />
        
        {isProcessing ? (
          <div className="processing-state">
            <div className="spinner"></div>
            <div className="stage-text">{stage || 'PROCESSING EVIDENTIAL DATA...'}</div>
            
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>

            {uploadedFile && (
              <div style={{ fontSize: '0.7rem', color: 'var(--color-warm-ivory)' }}>
                {uploadedFile.name} ({uploadedFile.size})
              </div>
            )}

            <div className="pipeline-notice">SYNTHETIC DEMONSTRATION PIPELINE</div>
          </div>
        ) : uploadedFile ? (
          <div className="success-state">
            <CheckCircle2 className="text-acid-lime" size={32} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              {getFileIcon(uploadedFile.name)}
              <div>
                <div className="file-name">{uploadedFile.name}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-muted-gray)' }}>{uploadedFile.size} • Verified Ingestion</div>
              </div>
            </div>
            <div className="upload-more" style={{ marginTop: '8px', textDecoration: 'underline' }}>
              Click to browse or drop another evidence file
            </div>
          </div>
        ) : (
          <div className="idle-state">
            <Upload size={28} className="upload-icon" />
            <div className="upload-text">DRAG & DROP OR BROWSE FILES</div>
            <div className="supported-formats">PDF • DOC • IMG • AUD • VID • CSV</div>
            
            <button 
              className="btn-primary" 
              style={{ marginTop: '12px', fontSize: '0.75rem', padding: '6px 12px', background: 'var(--color-graphite-light)', borderColor: 'var(--color-acid-lime)' }}
              onClick={handleSamplePdfClick}
            >
              <FileCheck size={14} className="text-acid-lime" /> LOAD SYNTHETIC SAMPLE PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvidenceVault;
