const express = require('express');
const router = express.Router();
const {
  getAllContactForms,
  createContactForm,
  getContactFormById,
  deleteContactForm,
} = require('../controllers/contactFormController');
const { authenticateToken } = require('../middleware/auth');
const userAuth = require('../middleware/userAuth');


// GET /contact
router.get('/', userAuth, getAllContactForms);

// GET /contact/<id>
router.get('/:contactFormId', userAuth, getContactFormById);

// POST /contact
router.post('/', createContactForm);

// DELETE /contact/<id>
router.delete('/:contactFormId', userAuth, deleteContactForm);

module.exports = router;
