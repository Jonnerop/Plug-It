const ContactForm = require('../models/contactFormModel');
const mongoose = require('mongoose');

/**
 * @desc    Retrieve all contact forms, sorted by creation date (newest first)
 * @route   GET /api/contact-forms
 * @access  Private
 */
const getAllContactForms = async (req, res) => {
  try {
    const contactForms = await ContactForm.find({}).sort({ createdAt: -1 });
    res.status(200).json(contactForms);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get contact forms' });
  }
};

/**
 * @desc    Create a new contact form
 * @route   POST /api/contact-forms
 * @access  Private
 */
const createContactForm = async (req, res) => {
  try {
    const newContactForm = await ContactForm.create({ ...req.body });
    res.status(201).json(newContactForm);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to create contact form', error: error.message });
  }
};

/**
 * @desc    Retrieve a contact form by ID
 * @route   GET /api/contact-forms/:contactFormId
 * @access  Private
 */
const getContactFormById = async (req, res) => {
  const { contactFormId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactFormId)) {
    return res.status(400).json({ message: 'Invalid contact form ID' });
  }

  try {
    const contactForm = await ContactForm.findById(contactFormId);
    if (contactForm) {
      res.status(200).json(contactForm);
    } else {
      res.status(404).json({ message: 'Contact form not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve contact form' });
  }
};

// @desc   Delete a contact form by ID
// @route  DELETE /api/contact-forms/:contactFormId
// @access Private
const deleteContactForm = async (req, res) => {
  const { contactFormId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactFormId)) {
    return res.status(400).json({ message: 'Invalid contact form ID' });
  }

  try {
    const contactForm = await ContactForm.findByIdAndDelete(contactFormId);
    if (contactForm) {
      res.status(200).json({ message: 'Contact form deleted successfully' });
    } else {
      res.status(404).json({ message: 'Contact form not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete contact form' });
  }
};

module.exports = {
  getAllContactForms,
  createContactForm,
  getContactFormById,
  deleteContactForm,
};