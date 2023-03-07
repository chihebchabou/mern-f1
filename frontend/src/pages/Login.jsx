import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { login, reset } from '../features/auth/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  );

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
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
          Account <span className="text-primary">Login</span>
        </h1>
        <form onSubmit={onSubmit}>
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
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-lg btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    )
  );
}

export default Login;
