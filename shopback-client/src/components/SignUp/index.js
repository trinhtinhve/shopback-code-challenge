import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './styles.css';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorTextPassword: '',
      errorTextEmail: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  _renderTitle() {
    return (
      <div className="title">
        Create your account
      </div>
    );
  }

  _renderFullName() {
    return (
      <div className="full-name">
        <div className="first-name">
          <TextField fullWidth hintText="First name" onChange={this._onChangeFirstName.bind(this)} />
        </div>
        <div className="last-name">
          <TextField fullWidth hintText="Last name" onChange={this._onChangeLastName.bind(this)} />
        </div>
      </div>
    );
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

  _renderHaveAccountLink() {
    return (
      <div className="have-account-link" onClick={this._onHaveAccountClick.bind(this)}>
        Have an account?
      </div>
    );
  }

  _renderCreateButton() {
    return (
      <div className="create-button">
        <RaisedButton
          label="Create account"
          primary={true}
          onClick={this._onCreateAccountClick.bind(this)}
        />
      </div>
    );
  }

  _onChangeFirstName(event) {
    this.setState({ firstName: event.target.value });
  }

  _onChangeLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  _onChangeEmail(event) {
    this.setState({ email: event.target.value, errorTextEmail: '' });
  }

  _onChangePassword(event) {
    this.setState({ password: event.target.value, errorTextPassword: '' });
  }

  _onHaveAccountClick() {
    this.props.handleHaveAccountClick();
  }

  _onCreateAccountClick() {
    const { email, password, firstName, lastName } = this.state;

    if (email === '') this.setState({ errorTextEmail: 'Fill in the field' });
    if (password === '') this.setState({ errorTextPassword: 'Fill in the field' });

    const indexOf = email.indexOf('@');
    if (indexOf < 0 || indexOf === email.length-1 || indexOf === 0) {
      this.setState({ errorTextEmail: 'It not Email field' });
      return;
    }

    if (email !== '' && password !== '') {
      this.props.handleCreateAccountClick(email, password, firstName, lastName);
    }
  }

  render() {
    return (
      <div className="sign-up">
        {this._renderTitle()}
        {this._renderFullName()}
        {this._renderEmail()}
        {this._renderPassword()}
        {this._renderHaveAccountLink()}
        {this._renderCreateButton()}
      </div>
    );
  }
}

export default SignUp;
