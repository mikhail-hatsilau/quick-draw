import React, { PropTypes } from 'react';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
    this.props.signIn(this.state.username, this.state.password);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="username"
          value={this.state.username}
          ref="username"
          onChange={this.handleChange}
        />
        <input
          name="password"
          value={this.state.password}
          ref="password"
          onChange={this.handleChange}
        />
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
