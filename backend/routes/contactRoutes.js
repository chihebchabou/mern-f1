const { getContacts, setContact, updateContact, deleteContact } = require('../controllers/contactController');

const {body} = require('express-validator');
const { protect } = require('../middleware/authMiddleware');


const router = require('express').Router();


// router.get('/', getContacts)
// router.post('/', setContact)
// router.put('/:id', updateContact)
// router.delete('/:id', deleteContact)

router.route('/').get(protect, getContacts).post(
  protect,
  body('name', 'Please include your name').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  setContact
);
router.route('/:id').put(protect, updateContact).delete(protect, deleteContact)

module.exports = router;