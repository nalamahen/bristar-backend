const express = require('express');
const router = express.Router();

const { emailToAdmin } = require('../controllers/contact');

const { contactUsValidator } = require('../validator');

router.post('/contact', contactUsValidator, emailToAdmin);

module.exports = router;
