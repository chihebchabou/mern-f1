import axios from "axios";

const API_URL = "/api/contacts/";

// Create new contact
const createContact = async (contactData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post(API_URL, contactData, config);
  return response.data
};

// Create new contact
const getContacts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(API_URL, config);
  return response.data
};

// Update user contact
const updateContact = async (contactData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.put(API_URL + contactData._id, contactData, config);
  return response.data
};

// Delete user contact
const deleteContact = async (contactId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.delete(API_URL + contactId, config);
  return response.data
};

const contactService = {
  createContact,
  getContacts,
  updateContact,
  deleteContact
};

export default contactService;