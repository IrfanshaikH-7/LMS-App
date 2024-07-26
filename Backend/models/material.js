const mongoose = require('mongoose');

const StudyMaterialSchema = new mongoose.Schema({
  isPaid: { type: Boolean, required: false, default: false },
  price: { type: Number, required: false },
  title: { type: String, required: true },
  description: { type: String },
  fileType: { type: String, required:false },
  fileUrl: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudyMaterial', StudyMaterialSchema);