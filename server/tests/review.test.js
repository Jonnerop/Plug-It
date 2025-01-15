const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Review = require('../models/reviewModel');
const api = supertest(app);
const User = require('../models/userModel');

const initialReviews = [
    {
        "rating": 5,
        "text": "This station is excellent! It's clean, well-maintained, and the charging speed is top-notch.",
        "user": "64c72b8fc4393b4f8b8e1f1d",
        "station": "64c72c9bc4393b4f8b8e1f1f"
    },
    {
        "rating": 3,
        "text": "The station works fine, but the location is inconvenient, and there are often long waiting times.",
        "user": "64c72b8fc4393b4f8b8e1f1e",
        "station": "64c72d7bc4393b4f8b8e1f21"
    }
];

let token = null;

beforeAll(async () => {
    await User.deleteMany({});
    await Review.deleteMany({});

    const newUser = {
        username: 'testuser',
        password: 'testpassword',
        email: 'jonjon.doe@example.com',
    };

    await api.post('/api/users').send(newUser).expect(201);

    const loginResponse = await api.post('/api/users/login').send({
        email: newUser.email,
        password: newUser.password,
    });

    token = loginResponse.body.token;
    expect(token).toBeDefined();
});

describe('Reviews API', () => {
    beforeEach(async () => {
        await Review.deleteMany({});
        await Promise.all([
            api
                .post('/api/reviews')
                .set('Authorization', 'Bearer ' + token)
                .send(initialReviews[0]),
            api
                .post('/api/reviews')
                .set('Authorization', 'Bearer ' + token)
                .send(initialReviews[1])
        ]);
        console.log("TOKEN HERE: " + token);
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    describe('Fetching all reviews', () => {
        describe('GET /api/reviews', () => {
            it('should return all reviews', async () => {
                const response = await api.get('/api/reviews');
                expect(response.status).toBe(200);
                expect(response.body).toHaveLength(initialReviews.length);
            });
            it('should return the reviews in JSON format', async () => {
                await api
                    .get('/api/reviews')
                    .expect(200)
                    .expect('Content-Type', /application\/json/);
            });
        });
    });

    describe("Creating a new review", () => {
        describe("POST /api/reviews", () => {
            it("should create a new review", async () => {
                const newReview = {
                    "rating": 4,
                    "text": "This station is great! The staff is friendly, and the location is convenient.",
                    "user": "64c72b8fc4393b4f8b8e1f1d",
                    "station": "64c72c9bc4393b4f8b8e1f1f"
                };
                const response = await api
                    .post('/api/reviews')
                    .set('Authorization', `Bearer ${token}`)
                    .send(newReview)
                    .expect(201)
                    .expect('Content-Type', /application\/json/);

                const revewsAtEnd = await Review.find({});
                expect(revewsAtEnd).toHaveLength(initialReviews.length + 1);
                expect(response.body.text).toBe(newReview.text);
            });
        });
    });

    describe("Fetching a single review", () => {
        describe("GET /api/reviews/:id", () => {
            it("should return a single review", async () => {
                const review = await Review.findOne({});
                const response = await api
                    .get(`/api/reviews/${review.id}`)
                    .expect(200)
                    .expect('Content-Type', /application\/json/);
                expect(response.body.text).toBe(review.text);
                expect(response.body.rating).toBe(review.rating);
            });
            it('should return 400 if job does not exist', async () => {
                const invalidId = '123456789012';
                await api
                    .get(`/api/reviews/${invalidId}`)
                    .expect(400);
            });
        });
    });

    describe("Updating a review", () => {
        describe("PUT /api/reviews/:id", () => {
            it("should update a review", async () => {
                const review = await Review.findOne({});
                const updatedReview = {
                    "rating": 4,
                    "text": "This station is great! The staff is friendly, and the location is convenient.",
                    "user": "64c72b8fc4393b4f8b8e1f1d",
                    "station": "64c72c9bc4393b4f8b8e1f1f"
                };
                const response = await api
                    .put(`/api/reviews/${review.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(updatedReview)
                    .expect(200)
                    .expect('Content-Type', /application\/json/);
                expect(response.body.text).toBe(updatedReview.text);
            });
            it('should return 400 if job does not exist', async () => {
                const invalidId = '123456789012';
                await api
                    .put(`/api/reviews/${invalidId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .expect(400);
            });
        });
    });

    describe("Deleting a review", () => {
        describe("DELETE /api/reviews/:id", () => {
            it("should delete a review", async () => {
                const review = await Review.findOne({});
                await api
                    .delete(`/api/reviews/${review.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .expect(204);
                const reviewsAtEnd = await Review.find({});
                expect(reviewsAtEnd).toHaveLength(initialReviews.length - 1);
            });
            it('should return 400 if job does not exist', async () => {
                const invalidId = '123456789012';
                await api
                    .delete(`/api/reviews/${invalidId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .expect(400);
            });
        });
    });
});