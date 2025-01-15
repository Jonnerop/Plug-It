const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//used with mock data
const stationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    coordinates: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    connectors: {
      type: [String],
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
  },
},
  { timestamps: true }
);

module.exports = mongoose.model('Station', stationSchema);