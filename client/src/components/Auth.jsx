import React, { PropTypes } from 'react';
import { Link } from 'react-router'; 
import Form from './Form';
import Input from './Input';
import constants from '../constants/constants';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate() {
    if (this.props.auth.get('shouldRedirect')) {
      this.props.router.replace('/');
    }
  }
  handleSubmit(model) {
    if (this.props.params.action === constants.AUTH_SIGNIN_PARAM) {
      this.props.signIn(model.username, model.password);
    } else {
      this.props.signUp(model.username, model.password);
    }
  }
  render() {
    return (
      <div className="auth-block">
        <div className="auth-block-header">
          {this.props.params.action === constants.AUTH_SIGNIN_PARAM ? 'Sign in' : 'Sign up'}
        </div>
        <div className="auth-block-content">
          <Form validSubmit={this.handleSubmit} serverError={this.props.auth.get('error')}>
            <Input
              name="username"
              validators={['required']}
              placeholder="Username"
              type="text"
            />
            <Input
              name="password"
              placeholder="Password"
              validators={['required']}
              type="password"
            />
            <input
              type="submit"
              value={this.props.params.action === constants.AUTH_SIGNIN_PARAM ? 'Sign in' : 'Sign up'}
            />
          </Form>
          {this.props.params.action === constants.AUTH_SIGNIN_PARAM ?
            <div className="register-offer">
              Don't have an account?
              <Link to="/auth/signup">Sign up now</Link>
            </div> :
            null
          }
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  params: PropTypes.object,
};

export default Auth;
