import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Phone, Trash2, Edit2, Linkedin, Instagram, Twitter, Facebook, Mail, Search, Filter, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import ContactDetail from '../components/ContactDetail';

export default function Dashboard({ token, username, apiBase }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [confirmDel, setConfirmDel] = useState(false);
  
  const [search, setSearch] = useState('');
  const [filterInst, setFilterInst] = useState('');
  const [filterOrigin, setFilterOrigin] = useState('');

  const nav = useNavigate();

  useEffect(() => { loadContacts(); }, [token, apiBase]);

  const loadContacts = () => {
    axios.get(`${apiBase}/contacts`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setContacts(res.data))
      .catch(() => toast.error('Gagal memuat data'))
      .finally(() => setLoading(false));
  };

  const handleDelete = async () => {
    const load = toast.loading('Menghapus...');
    try {
      await axios.delete(`${apiBase}/contacts/${selected._id}`, { headers: { Authorization: `Bearer ${token}` } });
      setContacts(prev => prev.filter(c => c._id !== selected._id));
      toast.dismiss(load); toast.success('Kontak dihapus');
      setConfirmDel(false); setSelected(null);
    } catch (err) { toast.dismiss(load); toast.error('Gagal menghapus'); }
  };

  const uniqueInst = [...new Set(contacts.map(c => c.institution).filter(Boolean))];
  const uniqueOrigin = [...new Set(contacts.map(c => c.origin).filter(Boolean))];

  const filteredContacts = contacts.filter(c => {
    const matchName = c.name.toLowerCase().includes(search.toLowerCase());
    const matchInst = filterInst ? c.institution === filterInst : true;
    const matchOrigin = filterOrigin ? c.origin === filterOrigin : true;
    return matchName && matchInst && matchOrigin;
  });

  const resetFilter = () => { setSearch(''); setFilterInst(''); setFilterOrigin(''); };

  return (
    <div>
      {/* 1. BARIS ATAS: JUDUL & TOMBOL TAMBAH (Poin 2) */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}>
        <div>
          <h3 style={{margin:0, fontSize:'1.6rem'}}>Halo, {username || 'Teman'}! 👋</h3>
          {/* Poin 1: Tulisan ini tetap dipertahankan */}
          <div className="small" style={{color:'var(--text-muted)', marginTop:4, fontSize:'1rem'}}>
            Kamu punya <b>{contacts.length} koneksi</b>.
          </div>
        </div>
        
        {/* Tombol Tambah di Pojok Kanan Atas */}
        <Link to="/add">
          <button className="btn" style={{padding:'12px 20px', boxShadow:'0 4px 14px rgba(16, 185, 129, 0.2)'}}>
            <Plus size={20}/> Tambah
          </button>
        </Link>
      </div>

      {/* 2. BARIS KEDUA: TOOLBAR SEARCH & FILTER (Poin 3) */}
      <div style={{
        display:'flex', gap:12, flexWrap:'wrap', alignItems:'center', 
        marginBottom:30, background:'var(--card)', padding:16, 
        borderRadius:16, border:'1px solid var(--border)', boxShadow:'var(--shadow-sm)'
      }}>
        <div style={{flex:1, position:'relative', minWidth:240}}>
          <Search size={18} style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)'}}/>
          <input 
            className="input" 
            placeholder="Cari nama kenalan..." 
            style={{paddingLeft:40, border:'none', background:'var(--bg)'}}
            value={search} onChange={e=>setSearch(e.target.value)}
          />
        </div>

<div style={{height:24, width:1, background:'var(--border)', margin:'0 4px'}}></div>

        {/* POIN 1: Dropdown pakai class "input" biar ada bordernya */}
        <select className="input" style={{width:'auto', minWidth:160, cursor:'pointer'}} value={filterInst} onChange={e=>setFilterInst(e.target.value)}>
          <option value="">Semua Institusi</option>
          {uniqueInst.map(i => <option key={i} value={i}>{i}</option>)}
        </select>

        <select className="input" style={{width:'auto', minWidth:140, cursor:'pointer'}} value={filterOrigin} onChange={e=>setFilterOrigin(e.target.value)}>
          <option value="">Semua Asal</option>
          {uniqueOrigin.map(o => <option key={o} value={o}>{o}</option>)}
        </select>

        {(search || filterInst || filterOrigin) && (
          <button onClick={resetFilter} className="icon-btn" style={{border:'none', background:'var(--danger)', color:'white', width:36, height:36}} title="Reset Filter">
            <XCircle size={18}/>
          </button>
        )}
      </div>

      {loading ? <div style={{textAlign:'center', padding:40}}>Memuat data...</div> : (
        <div className="grid-container">
          {filteredContacts.map(c => (
            <div key={c._id} className="contact-card" onClick={() => setSelected(c)}>
              <img src={c.photo || 'https://via.placeholder.com/300?text=No+Photo'} className="card-img" alt={c.name}/>
              <div className="card-body">
                <h3 className="card-name">{c.name}</h3>
                <div className="card-sub">{c.institution} • {c.origin}</div>
                <div className="card-socials">
                  {c.phoneNumber && <div title={c.phoneNumber}><Phone size={16} className="social-icon"/></div>}
                  {c.email && <div title={c.email}><Mail size={16} className="social-icon"/></div>}
                  {c.linkedin && <Linkedin size={16} className="social-icon" />}
                  {c.instagram && <Instagram size={16} className="social-icon" />}
                  {c.twitter && <Twitter size={16} className="social-icon" />}
                </div>
              </div>
              <div className="card-actions">
                <button className="btn ghost" style={{flex: 1, padding: '8px', fontSize: '0.8rem', borderRadius: 6}} 
                  onClick={(e) => { e.stopPropagation(); nav(`/edit/${c._id}`); }}>
                  <Edit2 size={14}/> Edit
                </button>
                <button className="btn danger" style={{padding: '8px 12px', borderRadius: 6}} 
                  onClick={(e) => { e.stopPropagation(); setSelected(c); setConfirmDel(true); }}>
                  <Trash2 size={14}/>
                </button>
              </div>
            </div>
          ))}

          {/* CARD TAMBAH (Add Card) - Tetap ada di bawah */}
          {(!search && !filterInst && !filterOrigin) && (
            <Link to="/add" style={{textDecoration:'none'}}>
              <div className="contact-card" style={{
                height:'100%', minHeight:300, 
                display:'flex', alignItems:'center', justifyContent:'center',
                border:'2px dashed var(--border)', background:'transparent', boxShadow:'none',
                opacity: 0.7, transition:'0.2s'
              }}
              onMouseEnter={(e)=>{e.currentTarget.style.opacity=1; e.currentTarget.style.borderColor='var(--primary)'}}
              onMouseLeave={(e)=>{e.currentTarget.style.opacity=0.7; e.currentTarget.style.borderColor='var(--border)'}}
              >
                <div style={{textAlign:'center', color:'var(--text-muted)'}}>
                  <div style={{
                    width:56, height:56, borderRadius:'50%', background:'var(--bg)', 
                    display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px',
                    border:'1px solid var(--border)'
                  }}>
                    <Plus size={28} color="var(--primary)"/>
                  </div>
                  <span style={{fontWeight:600}}>Tambah Baru</span>
                </div>
              </div>
            </Link>
          )}
        </div>
      )}

      {filteredContacts.length === 0 && !loading && (
        <div style={{textAlign:'center', padding:60, color:'var(--text-muted)'}}>
          <Filter size={48} style={{opacity:0.2, marginBottom:10}} />
          <p>Tidak ada kontak yang cocok.</p>
          <button className="btn ghost" onClick={resetFilter}>Reset Filter</button>
        </div>
      )}

      <Modal open={!!selected && !confirmDel} onClose={() => setSelected(null)}>
        <ContactDetail contact={selected} />
      </Modal>

      <Modal open={confirmDel} onClose={() => setConfirmDel(false)} title="Hapus Koneksi?">
        <p>Yakin ingin menghapus <b>{selected?.name}</b>?</p>
        <div style={{display:'flex', justifyContent:'end', gap:10, marginTop:20}}>
          <button className="btn ghost" onClick={() => setConfirmDel(false)}>Batal</button>
          <button className="btn danger" onClick={handleDelete}>Ya, Hapus</button>
        </div>
      </Modal>
    </div>
  );
}