const mongoose = require('mongoose');
const Station = require('../models/stationModel');
const fs = require('fs'); //file system module to read json
require('dotenv').config({ path: '../.env' });
console.log(process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    //read station data from JSON file
    const stationsData = JSON.parse(
      fs.readFileSync('./ev_stations_mock_data.json', 'utf8')
    );

    //insert data into the database
    const result = await Station.insertMany(stationsData);
    console.log('Stations inserted:', result);

    mongoose.connection.close(); //close connection after insertion
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};

connectDB();
