const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
}, { versionKey: false })

const SubjectModel = mongoose.model('subject', subjectSchema);

module.exports = { SubjectModel };