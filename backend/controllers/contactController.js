const Contact = require("../models/contactModel");
const asyncHandler = require('express-async-handler')
const {validationResult} = require('express-validator')

const controller = {}

/**
 * @route GET /api/contacts
 * @desc Get all users contacts
 * @access Private
 */
controller.getContacts = asyncHandler(async (req ,res) => {
  const contacts = await Contact.find()
  res.status(200).json(contacts);
});

/**
 * @route POST /api/contacts
 * @desc Add new contact
 * @access Private
 */
controller.setContact =asyncHandler(async (req ,res) => {
  // if (!req.body.name) {
  //   res.status(400)
  //   throw new Error('name is required')
  // }

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400)
    console.log(errors.array().map(error => error.msg).join("\n"));
    throw new Error(errors.array().map(error => error.msg).join("\n"))
  }

  const {name, email, phone, type} = req.body;

  const contact = await Contact.create({name, email, phone, type})

  res.status(201).json(contact)
});

/**
 * @route PUT /api/contacts/:id
 * @desc Update Contact
 * @access Private
 */
controller.updateContact = asyncHandler(async (req ,res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error('Contact not found');
  }

  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedContact)
  // res.status(200).json({message: `Contact ${req.params.id} updated`})
});

/**
 * @route DELETE /api/contacts/:id
 * @desc Delete Contact
 * @access Private
 */
controller.deleteContact = asyncHandler(async (req ,res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error('Contact not found');
  }

  await contact.remove()
  res.status(200).json({id: req.params.id})
  // res.status(200).json({message: `Contact ${req.params.id} deleted`})
});

module.exports = controller