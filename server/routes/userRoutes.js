const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/userAuth');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const { S3Client } = require("@aws-sdk/client-s3");
const {
  getAllUsers,
  getUserById,
  createUser,
  replaceUser,
  updateUser,
  deleteUser,
  userLogin,
  getMe,
  googleLogin,
  addUserStation,
  removeUserStation,
} = require('../controllers/userController');
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname)); // Use Date.now() for unique file keys
    },
  }),
});


// For user routes that don't require auth

// POST /users (registration)
router.post('/',createUser);

// POST /users/login (logging in)
router.post('/login', userLogin);

// POST /users/google-login (Google login)
router.post('/google-login', googleLogin)

// GET /users/me (Fetch currently logged in user)
router.get('/me', userAuth, getMe);

// GET /users
router.get('/', getAllUsers);

// GET /users/:stationId
router.get('/:userId', getUserById);

// PUT /users/:stationId
router.put('/:userId', userAuth, replaceUser);

// PATCH /users/:stationId
router.patch('/:userId', userAuth, upload.single("picture"), updateUser);

// DELETE /users/:stationId
router.delete('/:userId', deleteUser);

// POST /users/:userId/stations
router.post('/:userId/stations', userAuth, addUserStation);

// DELETE /users/:userId/stations
router.delete('/:userId/stations/:stationId', userAuth, removeUserStation);

module.exports = router;