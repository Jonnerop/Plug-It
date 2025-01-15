const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const cors = require('cors');
const stationRoutes = require('./routes/stationRoutes');
const userRoutes = require('./routes/userRoutes');
const chargerRoutes = require('./routes/ocmStationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const logger = require('./middleware/logger');
const contactFormRoutes = require('./routes/contactFormRoutes');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('dotenv').config();

if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI not set in environment variables');
  process.exit(1);
}

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCssUrl: '/swagger.css',
    customfavIcon: '/pin_icon.png',
  })
);

app.get('/', (req, res) => res.send('API Running!'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', userRoutes);
app.use('/api/chargers', chargerRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactFormRoutes);

//export the app for testing without starting the server
module.exports = app;

//start the server only if not in test mode
if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
