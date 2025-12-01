import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, X, Save } from "lucide-react";

export default function FormContact({ token, apiBase, editMode = false }) {
  const nav = useNavigate();
  const { id } = useParams();

  // State sesuai model backend
  const [form, setForm] = useState({
    name: "",
    origin: "",
    institution: "",
    dateOfBirth: "",
    phoneNumber: "",

    email: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    facebook: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  // Ambil data untuk EDIT
  useEffect(() => {
    if (editMode && id) {
      axios
        .get(`${apiBase}/contacts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setForm((prev) => ({ ...prev, ...res.data }));
          setPreview(res.data.photo || "");
        })
        .catch(() => {
          alert(
            "Gagal mengambil data. Pastikan server punya route GET /api/contacts/:id"
          );
        });
    }
  }, [editMode, id, token, apiBase]);

  // Input foto
  const onFile = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (!f) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  };

  // Submit form
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const fd = new FormData();

    // Kirim field biasa (kecuali photo)
    Object.keys(form).forEach((k) => {
      if (k !== "photo") {
        fd.append(k, form[k] || "");
      }
    });

    // Kirim foto hanya jika user upload baru
    if (file) {
      fd.append("photo", file);
    }

    try {
      const cfg = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editMode) {
        await axios.put(`${apiBase}/contacts/${id}`, fd, cfg);
        alert("Data berhasil diperbarui!");
      } else {
        await axios.post(`${apiBase}/contacts`, fd, cfg);
        alert("Data berhasil ditambahkan!");
      }

      nav("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="form-container">
      {/* Header Form */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>
          {editMode ? "Edit Koneksi" : "Tambah Koneksi"}
        </h2>
        <button onClick={() => nav("/")} className="icon-btn">
          <X size={20} />
        </button>
      </div>

      {/* FORM */}
      <form onSubmit={submit}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 100,
              height: 100,
              margin: "0 auto 12px",
              borderRadius: "50%",
              overflow: "hidden",
              background: "var(--bg-soft)",
              border: "2px dashed var(--border)",
              position: "relative",
              display: "grid",
              placeItems: "center",
            }}
          >
            {preview ? (
              <img
                src={preview}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt="Preview"
              />
            ) : (
              <Upload size={24} color="gray" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={onFile}
              style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
            />
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Ganti Foto
          </div>
        </div>

        {/* NAMA */}
        <div className="form-group">
          <label className="label">Nama</label>
          <input
            className="input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        {/* INSTITUSI - ASAL */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="form-group">
            <label className="label">Institusi</label>
            <input
              className="input"
              value={form.institution}
              onChange={(e) => setForm({ ...form, institution: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Asal</label>
            <input
              className="input"
              value={form.origin}
              onChange={(e) => setForm({ ...form, origin: e.target.value })}
              required
            />
          </div>
        </div>

        {/* LAHIR - WA */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="form-group">
            <label className="label">Tanggal Lahir</label>
            <input
              className="input"
              type="date"
              value={form.dateOfBirth?.split("T")[0] || ""}
              onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="label">Nomor WhatsApp</label>
            <input
              className="input"
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              required
            />
          </div>
        </div>

        {/* SOSMED */}
        <h4
          style={{
            color: "var(--accent)",
            marginTop: 20,
            marginBottom: 10,
            borderBottom: "1px solid var(--border)",
            paddingBottom: 4,
          }}
        >
          Sosial Media
        </h4>

        <div className="form-group">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="form-group">
            <label className="label">LinkedIn</label>
            <input
              className="input"
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="label">Instagram</label>
            <input
              className="input"
              value={form.instagram}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="label">Twitter</label>
            <input
              className="input"
              value={form.twitter}
              onChange={(e) => setForm({ ...form, twitter: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="label">Facebook</label>
            <input
              className="input"
              value={form.facebook}
              onChange={(e) => setForm({ ...form, facebook: e.target.value })}
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          className="btn"
          style={{ width: "100%", justifyContent: "center", marginTop: 20 }}
          type="submit"
          disabled={saving}
        >
          <Save size={18} /> {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
