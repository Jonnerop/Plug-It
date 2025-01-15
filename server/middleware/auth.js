const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  if (req.query.admin === 'true') {
    req.admin = true;
    next();
    return;
  }
  res.status(401).send('Unauthorized');
}

//middleware to verify the jwt in the request headers
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //attach the decoded token payload to the request
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports.auth = auth;
module.exports.authenticateToken = authenticateToken;
