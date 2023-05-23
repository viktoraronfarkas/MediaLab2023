// routes/subgroup.js
const express = require('express');

const router = express.Router();
const subgroupController = require('../controllers/subgroupController');

router.get('/:subgroupId/posts', subgroupController.getPostsBySubgroupId);
router.get('/:subgroupId/events', subgroupController.getEventsBySubgroupId);
router.post('/', subgroupController.createSubgroup);
router.post('/posts', subgroupController.createPost);
// router.post('/events', subgroupController.createEvent);

module.exports = router;
