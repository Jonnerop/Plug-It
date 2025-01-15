const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);
const User = require('../models/userModel');

beforeAll(async () => {
  await User.deleteMany({});
});

let createdUser;
let token;
let userId;

describe('User API', () => {
  describe('Getting all users', () => {
    describe('GET /api/users', () => {
      it('should return an empty array of users', async () => {
        const result = await api.get('/api/users');

        expect(result.status).toBe(200);
        expect(result.body).toEqual([]);
      });
    });
  });

  describe('Creating a new user', () => {
    describe('POST /api/users', () => {
      it('should create a new user with valid credentials', async () => {
        const userData = {
          username: 'Testuser',
          password: 'R3g5T7#gh',
          email: 'test@example.com',
        };

        const result = await api.post('/api/users').send(userData);

        expect(result.status).toBe(201);
      });
    });
  });

  describe('Logging in a user', () => {
    describe('POST /api/users/login', () => {
      it('should login the created user and return a token', async () => {
        const userData = {
          email: 'test@example.com',
          password: 'R3g5T7#gh',
        };
        const result = await api.post('/api/users/login').send(userData);
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('token');
        createdUser = JSON.stringify(result.body);
        token = result.body.token;
        userId = result.body.user.id;
      });
    });
  });

  describe('Getting users information', () => {
    describe('GET /api/users/me', () => {
      it('should return the user information', async () => {
        const userData = {
          email: 'test@example.com',
          password: 'R3g5T7#gh',
        };
        await api.get('/api/users/me').send(userData);
      });
    });
  });

  describe('Deleting a user', () => {
    describe('DELETE /api/users/:userId', () => {
      it('should delete the user when provided a valid token and userId', async () => {
        const result = await api
          .delete(`/api/users/${userId}`)
          .set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(200);
      });
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
