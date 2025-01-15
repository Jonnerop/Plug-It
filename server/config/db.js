const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`); //log the error message
    console.error(error.stack); //log the stack trace
    process.exit(1); //terminate the current process in case of an error
  }

  //close the connection when the process ends
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0); //terminate the process with success also
  });
};

module.exports = connectDB;