const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');

const { validateRegistration, validateLogin, authenticateToken } = require('../middleware/authValidation');

// --- Home Route ---
router.get('/', (req, res) => res.render('index'));

// --- Auth Routes ---
router.get('/register', authController.renderRegister);
router.post('/register', validateRegistration, authController.register);
router.get('/login', authController.renderLogin);
router.post('/login', validateLogin, authController.login);
router.post('/logout', authController.logout);

// --- User Routes ---
router.get('/users', authenticateToken, userController.getUsers);

// --- Profile Routes ---
router.get('/profile', authenticateToken, profileController.getProfile);

module.exports = router;
