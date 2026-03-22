const express = require('express');
const { body } = require('express-validator');
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getAllUsers,
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /users/register
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 50 }),
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  registerUser
);

// POST /users/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  loginUser
);

// GET /users/profile  (protected)
router.get('/profile', protect, getProfile);

// PUT /users/profile  (protected)
router.put(
  '/profile',
  protect,
  [
    body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name too short'),
    body('email').optional().isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password')
      .optional()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  updateProfile
);

// GET /users  (admin only)
router.get('/', protect, adminOnly, getAllUsers);

module.exports = router;
