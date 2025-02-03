import React from 'react';
import { NavLink } from 'react-router-dom';
import validate from '../utils/validate';

class Signin extends React.Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };

    validate(errors, name, value);

    this.setState({
      [name]: value,
      errors,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <>
        <form action="" method="post">
          <fieldset>
            <legend>LogIn Form</legend>
            <p>
              Not Registered ? <NavLink to="/signup">Click Here</NavLink>{' '}
            </p>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={email}
            />
            <span className="error">{errors.email}</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={password}
            />
            <span className="error">{errors.password}</span>

            <input
              type="submit"
              value="logIn"
              className="submit"
              disabled={errors.email || errors.password}
            />
          </fieldset>
        </form>
      </>
    );
  }
}
export default Signin;
