import React from 'react'
import { useSelector } from 'react-redux'
import ContactItem from './ContactItem';

const Contacts = () => {
  const { contacts } = useSelector(state => state.contacts);

  if (!contacts.length) {
    return <h3 className="text-center">You have not set any contacts</h3>
  }
  
  return contacts.map(contact => <ContactItem key={contact._id} contact={contact} />);
}

export default Contacts