// routes/subgroup.js
const express = require('express');

const router = express.Router();
const subgroupController = require('../controllers/subgroupController');

router.get('/:subgroupId/posts', subgroupController.getPostsBySubgroupId);
router.get('/:subgroupId/events', subgroupController.getEventsBySubgroupId);
router.post('/add', subgroupController.createSubgroup);
router.post('/posts/add', subgroupController.createPost);
router.post('/posts/delete', subgroupController.deletePost);
router.post('/events/add', subgroupController.createEvent);
router.post('/events/delete', subgroupController.deleteEvent);

module.exports = router;
