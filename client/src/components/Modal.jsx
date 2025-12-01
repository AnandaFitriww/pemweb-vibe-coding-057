import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 20px', borderBottom:'1px solid var(--border)'}}>
          <h3 style={{margin:0, fontSize:'1.1rem'}}>{title || 'Detail'}</h3>
          <button onClick={onClose} style={{background:'transparent', border:'none', cursor:'pointer', color:'var(--text-muted)'}}>
            <X size={20} />
          </button>
        </div>
        <div style={{padding:20, maxHeight:'75vh', overflowY:'auto'}}>
          {children}
        </div>
      </div>
    </div>
  );
}