const { registerUser, loginUser, getMe } = require('../controllers/userController');
const {body} = require('express-validator');
const { protect } = require('../middleware/authMiddleware');

const router = require('express').Router();

router.post('/',
  body('name', "Please add name").notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({min: 6}),
  registerUser
);
router.post('/login', loginUser);
router.get('/me', protect, getMe)

module.exports = router;