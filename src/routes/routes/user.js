// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:userId/subscribed-groups', userController.getSubscribedGroups);
//router.get('/:userId/subscribed-maingroups', userController.getSubscribedMainGroups);
//router.get('/:userId/subscribed-subgroups', userController.getSubscribedSubGroups);
router.post('/subscribe/maingroup', userController.subscribeToMainGroups);
router.post('/subscribe/subgroup', userController.subscribeToSubgroup);
//router.post('/signup', userController.signup);

module.exports = router;
