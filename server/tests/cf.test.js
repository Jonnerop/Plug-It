const supertest = require('supertest');
const mongoose = require('mongoose');
const ContactForm = require('../models/contactFormModel');
const User = require('../models/userModel');
const app = require('../app');
const api = supertest(app);
const jwt = require('jsonwebtoken');

beforeAll(async () => {
  await ContactForm.deleteMany({});
  await User.deleteMany({});

  const adminUser = new User({
    username: 'AdminUser',
    email: 'admin@example.com',
    password: 'SecurePass123!', 
    isAdmin: true,
  });
  await adminUser.save();

  //generate a JWT token for the admin user
  adminToken = jwt.sign(
    { id: adminUser._id, isAdmin: adminUser.isAdmin },
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
  );
});

let createdContactFormId;
let adminToken;

describe('Contact Forms API', () => {
  describe('GET /api/contact', () => {
    it('should return an empty array if no contact forms exist', async () => {
      const response = await api
        .get('/api/contact')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /api/contact', () => {
    it('should create a new contact form', async () => {
      const contactFormData = {
        name: 'Masa Meikalainen',
        email: 'masa@example.com',
        content: 'This is a test message.',
      };

      const response = await api
        .post('/api/contact')
        .send(contactFormData)

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        name: 'Masa Meikalainen',
        email: 'masa@example.com',
        content: 'This is a test message.',
      });

      createdContactFormId = response.body._id;
      expect(createdContactFormId).toBeDefined();
    });
  });

  describe('GET /api/contact/:contactFormId', () => {
    it('should retrieve a contact form by its ID', async () => {
      const response = await api
        .get(`/api/contact/${createdContactFormId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        name: 'Masa Meikalainen',
        email: 'masa@example.com',
        content: 'This is a test message.',
      });
    });

    it('should return 404 for a non-existing contact form ID', async () => {
      const nonExistingId = new mongoose.Types.ObjectId();
      const response = await api
        .get(`/api/contact/${nonExistingId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Contact form not found');
    });
  });

  describe('DELETE /api/contact/:contactFormId', () => {
    it('should delete the contact form by its ID', async () => {
      const response = await api
        .delete(`/api/contact/${createdContactFormId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Contact form deleted successfully');
    });

    it('should return 404 for a non-existing contact form ID', async () => {
      const nonExistingId = new mongoose.Types.ObjectId();
      const response = await api
        .delete(`/api/contact/${nonExistingId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Contact form not found');
    });
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});
