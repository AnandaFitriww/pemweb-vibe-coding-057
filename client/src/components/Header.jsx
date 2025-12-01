import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, User, Share2, LogOut, Settings } from 'lucide-react';

export default function Header({ theme, setTheme, username, onLogout }){
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const nav = useNavigate();

  useEffect(()=>{
    const onDoc = e => { if(ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', onDoc);
    return ()=>document.removeEventListener('click', onDoc);
  },[]);

  return (
    <header className="app-header">
      <Link to="/" className="brand">
        {/* POIN 2: Logo Background Hijau (var(--primary)) */}
        <div style={{background:'var(--primary)', padding:6, borderRadius:8, display:'flex'}}>
          <Share2 size={24} color="white" />
        </div>
        <h2 style={{margin:0, fontSize:'1.3rem', fontWeight:800}}>ConnectIn</h2>
      </Link>

      <div style={{display:'flex', gap:10}}>
        <button className="icon-btn" onClick={()=>setTheme(t => t === 'dark' ? 'light' : 'dark')} title="Ubah Tema">
          {theme === 'dark' ? <Sun size={20}/> : <Moon size={20}/>}
        </button>

        <div style={{position:'relative'}} ref={ref}>
          <button className="icon-btn" onClick={()=>setOpen(s=>!s)}>
            <User size={20} />
          </button>
          
          {open && (
            <div style={{
              position:'absolute', right:0, top:55, background:'var(--card)', 
              border:'1px solid var(--border)', borderRadius:12, padding:8, 
              width:220, boxShadow:'var(--shadow-hover)', zIndex:100,
              transformOrigin: 'top right', animation: 'fadeIn 0.2s ease'
            }}>
              <div style={{padding:'8px 12px', borderBottom:'1px solid var(--border)', marginBottom:8}}>
                <div style={{fontSize:'0.75rem', color:'var(--text-muted)', textTransform:'uppercase'}}>Login sebagai</div>
                <div style={{fontWeight:700, fontSize:'1rem', color:'var(--primary)'}}>{username}</div>
              </div>
              
              <button className="btn ghost" style={{width:'100%', justifyContent:'flex-start', border:'none', textAlign:'left', padding:'10px'}} 
                onClick={()=>{ setOpen(false); nav('/settings'); }}>
                <Settings size={16} style={{marginRight:8}}/> Pengaturan
              </button>
              
              <button className="btn danger" style={{width:'100%', justifyContent:'flex-start', marginTop:4, textAlign:'left', padding:'10px'}} onClick={onLogout}>
                <LogOut size={16} style={{marginRight:8}}/> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}