const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true },
  institution: { type: String, required: true },
  dateOfBirth: { type: String, required: false },
  phoneNumber: { type: String, required: true },
  
  // Field Baru (Wajib didefinisikan manual)
  email: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  instagram: { type: String, default: '' },
  twitter: { type: String, default: '' },
  facebook: { type: String, default: '' },

  photo: { type: String }, 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);