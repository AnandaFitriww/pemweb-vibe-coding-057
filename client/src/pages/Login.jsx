import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // Import Toast

const API = import.meta.env?.VITE_API_URL || 'http://localhost:3001/api';

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Memproses...'); // Loading animation
    try {
      if (mode === 'login') {
        const res = await axios.post(`${API}/login`, { username, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        onLogin(res.data.token, res.data.username);
        toast.dismiss(loadingToast);
        toast.success(`Selamat datang, ${res.data.username}!`); // Success Alert
        nav('/');
      } else {
        await axios.post(`${API}/register`, { username, password });
        toast.dismiss(loadingToast);
        toast.success('Registrasi berhasil! Silakan login.');
        setMode('login');
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || err.message); // Error Alert
    }
  };

  return (
    <div style={{display:'grid', placeItems:'center', minHeight:'80vh', padding:16}}>
      <div className="form-container" style={{width:380, padding:40}}>
        <h2 style={{marginTop:0, textAlign:'center'}}>{mode === 'login' ? 'Masuk' : 'Daftar'}</h2>
        <p className="small" style={{textAlign:'center', marginBottom:24}}>myNetwork — Kelola relasi profesionalmu.</p>
        <form onSubmit={submit}>
          <div className="form-group">
            <input className="input" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <input className="input" placeholder="Kata sandi" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <button className="btn" style={{width:'100%', justifyContent:'center'}} type="submit">{mode==='login' ? 'Masuk' : 'Daftar'}</button>
          <div style={{textAlign:'center', marginTop:16}}>
            <button type="button" className="btn ghost" style={{border:'none'}} onClick={()=>setMode(m=>m==='login'?'register':'login')}>
              {mode==='login' ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Masuk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}