const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser && existingUser.length > 0) {
      return res.status(409).render('register', { error: 'This email is already used.' }); // 409 Conflict
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userService.createUser(name, email, hashedPassword);

    // Redirect to login page after successful registration
    res.redirect('/login');

  } catch (err) {
    console.error(err);
    res.status(500).render('register', { error: 'Server error during registration.' }); // 500 Internal Server Error
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).render('login', { error: 'Invalid email or password.' }); // 401 Unauthorized
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).render('login', { error: 'Invalid email or password.' }); // 401 Unauthorized
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: '1h' });

    // Set token in cookie and redirect to profile
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    res.redirect('/profile');

  } catch (err) {
    console.error(err);
    res.status(500).render('login', { error: 'Server error during login.' }); // 500 Internal Server Error
  }
};

const renderRegister = (req, res) => {
  res.render('register');
};

const renderLogin = (req, res) => {
  res.render('login');
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};

module.exports = {
  register,
  login,
  renderRegister,
  renderLogin,
  logout
};