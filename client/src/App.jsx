import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Import Toast
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FormContact from './pages/FormContact';
import UserSetting from './pages/UserSetting';
import Header from './components/Header';

const API_BASE = import.meta?.env?.VITE_API_URL || 'http://localhost:3001/api';

export default function App(){
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogin = (tok, user) => {
    setToken(tok); setUsername(user);
    localStorage.setItem('token', tok); localStorage.setItem('username', user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); localStorage.removeItem('username');
    setToken(null); setUsername('');
    window.location.href = '/login';
  };

  return (
    <BrowserRouter>
      {/* Konfigurasi Notifikasi Global */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: { background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--border)' },
          success: { iconTheme: { primary: 'var(--primary)', secondary: 'white' } },
        }} 
      />

      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/*" element={
          token ? (
            <>
              <Header theme={theme} setTheme={setTheme} username={username} onLogout={handleLogout} />
              <div className="container">
                <Routes>
                  <Route path="/" element={<Dashboard token={token} username={username} apiBase={API_BASE} />} />
                  <Route path="/add" element={<FormContact token={token} apiBase={API_BASE} />} />
                  <Route path="/edit/:id" element={<FormContact token={token} apiBase={API_BASE} editMode />} />
                  <Route path="/settings" element={<UserSetting username={username} />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </>
          ) : <Navigate to="/login" />
        } />
      </Routes>
    </BrowserRouter>
  );
}