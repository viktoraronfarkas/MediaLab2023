// routes/subgroup.js
const express = require('express');

const router = express.Router();
const signUpController = require('../controllers/authController');

router.post('/signup', signUpController.signup);
router.post('/login', signUpController.login);

module.exports = router;
