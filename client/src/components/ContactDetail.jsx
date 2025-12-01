import React from 'react';
import { Mail, Linkedin, Instagram, Twitter, Facebook, Phone, MapPin, Calendar, Building } from 'lucide-react';

export default function ContactDetail({ contact }) {
  if (!contact) return null;

  const Row = ({ icon: Icon, label, value, isLink }) => {
    if(!value) return null;
    return (
      <div style={{display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:'1px solid var(--border)'}}>
        <div style={{color:'var(--accent)', background:'var(--bg-soft)', padding:8, borderRadius:8}}>
          <Icon size={18} />
        </div>
        <div style={{overflow:'hidden', textOverflow:'ellipsis'}}>
          <div style={{fontSize:'0.75rem', color:'var(--text-muted)', textTransform:'uppercase'}}>{label}</div>
          {isLink ? (
            <a href={value.startsWith('http') ? value : `https://${value}`} target="_blank" rel="noreferrer" 
               style={{color:'var(--text)', fontWeight:500, textDecoration:'none'}}>{value}</a>
          ) : <div style={{fontWeight:500}}>{value}</div>}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{textAlign:'center', marginBottom:24}}>
        <img src={contact.photo || 'https://via.placeholder.com/150'} 
          style={{width:100, height:100, borderRadius:'50%', objectFit:'cover', border:'4px solid var(--bg-soft)'}} />
        <h2 style={{margin:'12px 0 4px'}}>{contact.name}</h2>
        <div style={{color:'var(--accent)', fontWeight:600}}>{contact.institution}</div>
      </div>
      <div>
        <Row icon={Building} label="Institusi" value={contact.institution} />
        <Row icon={MapPin} label="Asal" value={contact.origin} />
        <Row icon={Calendar} label="Lahir" value={contact.dateOfBirth} />
        <Row icon={Phone} label="WhatsApp / HP" value={contact.phoneNumber} />
        <Row icon={Mail} label="Email" value={contact.email} />
        
        <div style={{marginTop:20, fontSize:'0.9rem', fontWeight:700, marginBottom:8}}>Sosial Media</div>
        <Row icon={Linkedin} label="LinkedIn" value={contact.linkedin} isLink />
        <Row icon={Instagram} label="Instagram" value={contact.instagram} isLink />
        <Row icon={Twitter} label="Twitter / X" value={contact.twitter} isLink />
        <Row icon={Facebook} label="Facebook" value={contact.facebook} isLink />
      </div>
    </div>
  );
}