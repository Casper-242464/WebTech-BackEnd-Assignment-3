const jwt = require('jsonwebtoken');

const validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).render('register', { error: 'Name, email and password are required.' }); // 400 Bad Request
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).render('register', { error: 'Invalid email format.' }); // 400 Bad Request
  }

  if (password.length < 8) {
    return res.status(400).render('register', { error: 'Password must be at least 8 characters long.' }); // 400 Bad Request
  }

  next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).render('login', { error: 'Email and password are required.' }); // 400 Bad Request
    }

    next();
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  const cookieToken = req.cookies.token;

  const finalToken = token || cookieToken;

  if (!finalToken) {
    return res.status(401).render('login', { error: 'Please log in to access this page.' }); // 401 Unauthorized
  }

  jwt.verify(finalToken, process.env.JWT_SECRET || 'defaultsecret', (err, user) => {
    if (err) {
      return res.status(403).render('login', { error: 'Session expired. Please log in again.' }); // 403 Forbidden
    }
    req.user = user;
    next();
  });
};

module.exports = {
    validateRegistration,
    validateLogin,
    authenticateToken
};