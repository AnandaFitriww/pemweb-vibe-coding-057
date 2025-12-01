require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Contact = require("./models/Contact");

const app = express();
app.use(cors());

// FIX WAJIB → perbesar payload size
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Err:", err));

// Multer Setup → naikkan limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Middleware Auth
function verifyAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token hilang" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
}

// --- AUTH ROUTES ---

app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const exist = await User.findOne({ username });
    if (exist) return res.status(400).json({ message: "Username sudah dipakai" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User tidak ditemukan" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Password salah" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, username: user.username });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- CONTACT ROUTES ---

// 1. GET ALL
app.get("/api/contacts", verifyAuth, async (req, res) => {
  try {
    const contacts = await Contact.find({ createdBy: req.userId }).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// 2. GET SINGLE
app.get("/api/contacts/:id", verifyAuth, async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, createdBy: req.userId });
    if (!contact) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(contact);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// 3. CREATE
app.post("/api/contacts", verifyAuth, upload.single("photo"), async (req, res) => {
  try {
    const data = req.body;

    let photoData = "";
    if (req.file && req.file.buffer) {
      photoData = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    const contact = await Contact.create({ ...data, photo: photoData, createdBy: req.userId });
    res.json(contact);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// 4. UPDATE
app.put("/api/contacts/:id", verifyAuth, upload.single("photo"), async (req, res) => {
  try {
    const data = req.body;

    if (req.file && req.file.buffer) {
      data.photo = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    const updated = await Contact.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId },
      data,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// 5. DELETE
app.delete("/api/contacts/:id", verifyAuth, async (req, res) => {
  try {
    await Contact.findOneAndDelete({ _id: req.params.id, createdBy: req.userId });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server jalan di port ${PORT}`));
