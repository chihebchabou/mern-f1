import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContactForm from '../components/ContactForm';
import Contacts from '../components/Contacts';
import Spinner from '../components/Spinner';
import { getContacts, reset } from '../features/contacts/contactSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { isLoading, isError, message } = useSelector(state => state.contacts);
  useEffect(() => {
    if (isError) {
      const messages = message.split('\n');
      messages.forEach(message => {
        toast.error(message);
      });
    }
    if (!user) {
      navigate('/login');
    }

    if (user) {
      dispatch(getContacts())
    }

    return () => {
      dispatch(reset());
    }
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />
  }
  
  return user && <div className='container mt-5'>
    <h5>Welcome <span className="text-primary">{user.name}</span></h5>
    <div className="row">
      <div className="col-md-6"><ContactForm /></div>
      <div className="col-md-6">
        <Contacts />
      </div>
    </div>
  </div>;
};

export default Dashboard;
