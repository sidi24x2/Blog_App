import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import validate from '../utils/validate';
import { signupUrl } from '../utils/constants';

function Signup({ updateUser, authUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    username: '',
  });

  let handleChange = (event) => {
    const { name, value } = event.target;

    validate(errors, name, value);

    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'username') setUsername(value);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(signupUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      updateUser(data.user);
      authUser(data.user);
      setEmail('');
      setPassword('');
      setUsername('');
      setErrors({});
      navigate('/');
    } catch (err) {
      console.log('SignUp Errors', err);

      if (err.errors) {
        setErrors(err.errors);
      } else if (err.message) {
        setErrors({ general: err.message });
      } else {
        setErrors({ general: 'Signup Faield , Please try again' });
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>SignUp Form</legend>
          <p>
            Already Registered ? <NavLink to="/login">Click Here</NavLink>
          </p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={email}
          />
          <span className="error"> {errors.email}</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
          />
          <span className="error"> {errors.password}</span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={username}
          />
          <span className="error"> {errors.username}</span>
          <input
            className="submit"
            type="submit"
            value="Register"
            disabled={!!errors.username || !!errors.password || !!errors.email}
          />
        </fieldset>
      </form>
    </>
  );
}

export default Signup;
