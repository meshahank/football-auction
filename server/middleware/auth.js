// Simple auth middleware for demo purposes
// In production, use JWT or OAuth

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const USER_PASSWORD = process.env.USER_PASSWORD || 'user123';

const authenticateAdmin = (req, res, next) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    req.isAdmin = true;
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const authenticateUser = (req, res, next) => {
  const { password } = req.body;
  if (password === USER_PASSWORD || password === ADMIN_PASSWORD) {
    req.isAdmin = password === ADMIN_PASSWORD;
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  authenticateAdmin,
  authenticateUser,
  ADMIN_PASSWORD,
  USER_PASSWORD
};
