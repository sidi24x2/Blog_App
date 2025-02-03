import React from 'react';
import { NavLink } from 'react-router-dom';
import validate from '../utils/validate';

class Signup extends React.Component {
  state = {
    email: '',
    password: '',
    username: '',
    errors: {
      email: '',
      password: '',
      username: '',
    },
  };

  handleClick = (event) => {
    let { name, value } = event.target;

    let errors = { ...this.state.errors };

    validate(errors, name, value);

    this.setState({
      [name]: value,
      errors,
    });
  };

  render() {
    const { email, password, username, errors } = this.state;
    return (
      <>
        <form action="" method="post">
          <fieldset>
            <legend>SignUp Form</legend>
            <p>
              Already Registered ? <NavLink to="/login">Click Here</NavLink>{' '}
            </p>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleClick}
              value={email}
            />
            <span className="error"> {errors.email}</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleClick}
              value={password}
            />
            <span className="error"> {errors.password}</span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleClick}
              value={username}
            />
            <span className="error"> {errors.username}</span>
            <input
              className="submit"
              type="submit"
              value="Register"
              disabled={errors.username || errors.password || errors.email}
            />
          </fieldset>
        </form>
      </>
    );
  }
}

export default Signup;
