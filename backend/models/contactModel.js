const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
  {
    user : {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User'
    },
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