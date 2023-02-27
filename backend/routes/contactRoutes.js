const { getContacts, setContact, updateContact, deleteContact } = require('../controllers/contactController');

const {body} = require('express-validator')


const router = require('express').Router();


// router.get('/', getContacts)
// router.post('/', setContact)
// router.put('/:id', updateContact)
// router.delete('/:id', deleteContact)

router.route('/').get(getContacts).post(
  body('name', 'Please include your name').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  setContact
);
router.route('/:id').put(updateContact).delete(deleteContact)

module.exports = router