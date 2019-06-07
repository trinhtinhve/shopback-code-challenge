import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './styles.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorTextPassword: '',
      errorTextEmail: '',
      email: '',
      password: ''
    };
  }

  _renderEmail() {
    return (
      <div className="email">
        <TextField
          errorText={this.state.errorTextEmail}
          onChange={this._onChangeEmail.bind(this)}
          hintText="Your email"
          fullWidth
        />
      </div>
    );
  }

  _renderPassword() {
    return (
      <div>
        <TextField
          type="password"
          errorText={this.state.errorTextPassword}
          onChange={this._onChangePassword.bind(this)}
          hintText="Password"
          fullWidth
        />
      </div>
    );
  }

  _renderLoginButton() {
    return (
      <div className="login-button">
        <RaisedButton
          label="Login"
          primary={true}
          onClick={this._onLoginClick.bind(this)}
        />
      </div>
    );
  }

  _renderCreateAccountLink() {
    return (
      <div className="dont-have-account-link" onClick={this._onNotHaveAccountClick.bind(this)}>
        Don't have an account? Create one
      </div>
    );
  }

  _onChangeEmail(event) {
    this.setState({ email: event.target.value, errorTextEmail: '' });
  }

  _onChangePassword(event) {
    this.setState({ password: event.target.value, errorTextPassword: '' });
  }

  _onNotHaveAccountClick() {
    this.props.handleNotHaveAccountClick();
  }

  _onLoginClick() {
    const { email, password } = this.state;

    if (email === '') this.setState({ errorTextEmail: 'Fill in the field' });
    if (password === '') this.setState({ errorTextPassword: 'Fill in the field' });

    const indexOf = email.indexOf('@');
    if (indexOf < 0 || indexOf === email.length-1 || indexOf === 0) {
      this.setState({ errorTextEmail: 'It not Email field' });
      return;
    }

    if (email !== '' && password !== '') {
      this.props.handleLoginClick(email, password);
    }
  }

  render() {
    return (
      <div className="login">
        {this._renderEmail()}
        {this._renderPassword()}
        {this._renderLoginButton()}
        {this._renderCreateAccountLink()}
      </div>
    );
  }
}

export default Login;
