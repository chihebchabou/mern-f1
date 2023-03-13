import React from 'react';
import { useDispatch } from 'react-redux';
import {FaEnvelopeOpen, FaPhone} from 'react-icons/fa';
import { deleteContact, setCurrent, unsetCurrent } from '../features/contacts/contactSlice';

const ContactItem = ({contact}) => {
  const { _id, name, email, phone, type, createdAt} = contact;
  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(setCurrent(contact));
  }

  const onDelete = () => {
    console.log("onDelete")
    dispatch(deleteContact(_id));
    dispatch(unsetCurrent());
  }
  
  return (
    <div className="card mt-3" style={{ width: '100%'}}>
      <div className="card-body">
        <h5 className="card-title">
          {name}
          <br />
          <small className="text-secondary fs-6">{new Date(createdAt).toDateString()} at {new Date(createdAt).toLocaleTimeString()}</small>
        </h5>
        <span style={{float: "right"}} className={`badge ${ type === 'professional' ? 'bg-success' : 'bg-primary' }`}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
        <p className="card-text">
          {email && (
            <span>
              <FaEnvelopeOpen /> {email}
            </span>
          )}
        </p>
        <p className="card-text">
          {phone && (
            <span>
              <FaPhone /> {phone}
            </span>
          )}
        </p>
        <button className="btn btn-secondary me-3" onClick={onEdit}>Edit</button>
        <button className="btn btn-danger me-3" onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}

export default ContactItem