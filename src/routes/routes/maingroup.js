// routes/maingroup.js
const express = require('express');

const router = express.Router();
const maingroupController = require('../controllers/maingroupController');

router.get('/', maingroupController.getMainGroupsWithSubgroups);

module.exports = router;
