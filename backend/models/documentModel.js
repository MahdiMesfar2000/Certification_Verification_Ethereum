const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true
  },
  CID: {
    type: String,
    required: true
  },
  receipt: {
    type: Object,
    required: true
  },
  studentAddress: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;