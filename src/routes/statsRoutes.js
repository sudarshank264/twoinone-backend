// const express = require('express');
// const router = express.Router();
// const { getDashboardStats } = require('../controllers/statsController');
// const { protect } = require('../middleware/authMiddleware');

// <<<<<<< HEAD
// router.route('/')
//     .get(protect, getDashboardStats);
// =======
// router.get('/', protect, getDashboardStats);
// >>>>>>> 2a52a49 (doing backend fully)

// module.exports = router;
const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/stats
// @desc    Get dashboard statistics (Protected)
router.route('/')
    .get(protect, getDashboardStats);

module.exports = router;