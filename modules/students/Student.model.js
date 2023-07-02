const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
}, { versionKey: false })

const StudentModel = mongoose.model('student', studentSchema);

module.exports = { StudentModel };