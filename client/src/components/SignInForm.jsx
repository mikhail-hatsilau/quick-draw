import React, { PropTypes } from 'react';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      requiredError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate() {
    if (this.props.auth.get('shouldRedirect')) {
      this.props.router.replace('/');
    }
  }
  handleChange() {
    this.setState({
      username: this.refs.username.value,
      password: this.refs.password.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.username === '') {
      this.setState({
        requiredError: true,
      });
      return;
    }
    if (this.state.password === '') {
      this.setState({
        requiredError: true,
      });
      return;
    }
    this.setState({
      requiredError: false,
    });
    this.props.signIn(this.state.username, this.state.password);
  }
  render() {
    let errorElement;
    if (this.props.auth.get('error') && !this.state.requiredError) {
      errorElement = <span>{this.props.auth.get('error')}</span>;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        {errorElement}
        <input
          className={!this.state.username && this.state.requiredError ? 'required-error' : ''}
          name="username"
          value={this.state.username}
          ref="username"
          onChange={this.handleChange}
        />
        {!this.state.username && this.state.requiredError ?
          <span>Please fill the username field</span> :
          null
        }
        <input
          className={!this.state.password && this.state.requiredError ? 'required-error' : ''}
          type="password"
          name="password"
          value={this.state.password}
          ref="password"
          onChange={this.handleChange}
        />
        {!this.state.password && this.state.requiredError ?
          <span>Please fill the password field</span> :
          null
        }
        <input type="submit" value="Sign in" />
      </form>
    );
  }
}

SignInForm.propTypes = {
  signIn: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default SignInForm;
