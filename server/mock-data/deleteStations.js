const mongoose = require('mongoose');
const Station = require('../models/stationModel');
require('dotenv').config({ path: '../.env' });

const clearCollection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    //empty the collection
    const result = await Station.deleteMany({});
    console.log(`All documents deleted: ${result.deletedCount}`);

    mongoose.connection.close(); //close connection after operation
  } catch (error) {
    console.error(error.message);
    mongoose.connection.close();
  }
};

clearCollection();
