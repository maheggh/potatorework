const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Missing or invalid Authorization header');
    return res.status(403).json({ message: 'Authorization denied. Invalid or missing token.' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Received Token:', token); // Log the token received

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log('Decoded Token:', decoded); // Log the decoded token to ensure it contains correct information

    req.user = decoded; // Attach the decoded user info (usually contains userId)
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(403).json({ message: 'Token verification failed. Please login again.' });
  }
};

module.exports = authMiddleware;
