const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getServices,
    createService,
    deleteService
} = require('../controllers/pzServiceController');

router.route('/')
    .get(getServices)
    .post(protect, createService);

router.route('/:id')
    .delete(protect, deleteService);

module.exports = router;
