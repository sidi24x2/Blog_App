export default function validate(errors, name, value) {
  switch (name) {
    case 'email':
      let emailError = value.indexOf('@') === -1 ? 'Email Must Include @' : '';
      errors.email = emailError;
      break;

    case 'password':
      let passwordError;

      if (value.length < 7) {
        passwordError = 'Password must be greater than 6 characters';
      }

      let rx = /^.*(?=.*[a-zA-Z])(?=.*\d).*$/;

      if (!rx.test(value)) {
        passwordError = 'Password must contain a letter and a digit';
      }

      errors.password = passwordError;
      break;

    case 'username':
      let usernameError;
      if (value.length < 7) {
        usernameError = 'Username should be greater than 6 characters';
      }
      errors.username = usernameError;
      break;

    default:
      return errors;
  }
}
