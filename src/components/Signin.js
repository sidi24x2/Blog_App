import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import validate from '../utils/validate';
import { loginUrl } from '../utils/constants';

function Signin({ updateUser, authUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    let { name, value } = event.target;

    validate(errors, name, value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw data;
      }
      updateUser(data.user);
      authUser(data.user);
      setEmail('');
      setPassword('');
      setErrors({});
      navigate('/');
    } catch (err) {
      setErrors(err.err);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>LogIn Form</legend>
          <p>
            Not Registered ? <NavLink to="/signup">Click Here</NavLink>{' '}
          </p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <span className="error">{errors.email}</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <span className="error">{errors.password}</span>

          <input
            type="submit"
            value="logIn"
            className="submit"
            disabled={!!errors.email || !!errors.password}
          />
        </fieldset>
      </form>
    </>
  );
}

export default Signin;
