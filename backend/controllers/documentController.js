const Document = require('../models/documentModel');

const addDocument = async (req, res) => {
  const { hash, CID, receipt, studentAddress } = req.body;

  if (!hash || !CID || !receipt || !studentAddress) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newDocument = new Document({
      hash,
      CID,
      receipt,
      studentAddress
    });

    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    console.error('Error adding document:', error);
    res.status(500).json({ error: 'Failed to add document' });
  }
};

const deleteDocument = async (req, res) => {
  const { hash } = req.body;

  if (!hash) {
    return res.status(400).json({ error: 'Hash is required' });
  }

  try {
    const deletedDocument = await Document.findOneAndDelete({ hash });

    if (!deletedDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
};

module.exports = {
  addDocument,
  deleteDocument
};