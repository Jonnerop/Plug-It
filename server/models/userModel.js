const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Password is required only if googleId is not present
      },
    },
    email: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows for null values
    },
    picture: {
      type: String,
    },
    location: {
      type: String,
    },
    stations: [Number],
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true, collection: 'users' }
);

userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});

module.exports = mongoose.model('User', userSchema);
