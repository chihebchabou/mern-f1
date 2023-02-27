const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
    },
    type: {
      type: String,
      default: 'personal'
    }
  },
  {timestamps: true}
);

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact 