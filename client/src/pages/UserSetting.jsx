import React, { useState } from 'react';
import { User, Shield, Key, Save } from 'lucide-react';

export default function UserSetting({ username }) {
  const [tab, setTab] = useState('profile'); // Tab state
  // State dummy buat form edit (belum connect API update user)
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState('');

  return (
    <div className="form-container" style={{maxWidth:600}}>
      <div style={{textAlign:'center', marginBottom:30}}>
        <div style={{width:80, height:80, background:'var(--bg-soft)', borderRadius:'50%', margin:'0 auto 16px', display:'grid', placeItems:'center', color:'var(--accent)', border:'2px solid var(--border)'}}>
          <User size={40} />
        </div>
        <h2>{username}</h2>
        <p style={{color:'var(--text-muted)'}}>Pengaturan Akun</p>
      </div>

      {/* Tabs */}
      <div style={{display:'flex', gap:10, marginBottom:20, borderBottom:'1px solid var(--border)', paddingBottom:10}}>
        <button onClick={()=>setTab('profile')} className={`btn ${tab==='profile'?'':'ghost'}`} style={{flex:1}}>Profil</button>
        <button onClick={()=>setTab('security')} className={`btn ${tab==='security'?'':'ghost'}`} style={{flex:1}}>Keamanan</button>
      </div>

      {tab === 'profile' ? (
        <div style={{display:'flex', flexDirection:'column', gap:16}}>
           <div className="form-group">
            <label className="label">Username</label>
            <input className="input" value={newUsername} onChange={e=>setNewUsername(e.target.value)} />
          </div>
          <div style={{padding:16, border:'1px solid var(--border)', borderRadius:12, display:'flex', alignItems:'center', gap:12}}>
            <Shield size={24} color="var(--accent)"/>
            <div><div style={{fontWeight:600}}>Status Akun</div><div style={{fontSize:'0.9rem', color:'var(--text-muted)'}}>Aktif & Aman</div></div>
          </div>
          <button className="btn" onClick={()=>alert('Fitur update profile akan segera hadir!')}><Save size={16}/> Simpan Perubahan</button>
        </div>
      ) : (
        <div style={{display:'flex', flexDirection:'column', gap:16}}>
           <div className="form-group">
            <label className="label">Password Baru</label>
            <input className="input" type="password" placeholder="Min. 6 karakter" value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
          </div>
          <button className="btn" onClick={()=>alert('Fitur ganti password akan segera hadir!')}><Key size={16}/> Update Password</button>
        </div>
      )}
    </div>
  );
}