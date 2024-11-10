const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profile.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authenticate, getProfile);
router.put('/', authenticate, updateProfile);

module.exports = router;
