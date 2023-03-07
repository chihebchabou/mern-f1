import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { register, reset } from '../features/auth/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  );

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      const messages = message.split('\n');
      messages.forEach(message => {
        toast.error(message);
      });
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    !user && (
      <div className="col-md-6 offset-md-3 pt-5">
        <h1 className="text-center mb-5">
          Account <span className="text-primary">Register</span>
        </h1>
        <form onSubmit={onSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="form-control form-control-lg"
              id="name"
              placeholder="Name"
            />
            <label htmlFor="name" className="from-label mb-1">
              Name
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="form-control form-control-lg"
              id="email"
              placeholder="Email"
            />
            <label htmlFor="email" className="from-label mb-1">
              Email
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="form-control form-control-lg"
              id="password"
              placeholder="Password"
            />
            <label htmlFor="password" className="from-label mb-1">
              Password
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              className="form-control form-control-lg"
              id="password2"
              placeholder="Confirm Password"
            />
            <label htmlFor="password" className="from-label mb-1">
              Confirm Password
            </label>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-lg btn-primary shadow-lg">
              Register
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default Register;
