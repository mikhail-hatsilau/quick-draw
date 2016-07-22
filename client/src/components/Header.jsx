import React, { PropTypes } from 'react';
import Navigation from './Navigation';
import SignOut from './SignOut';
import constants from '../constants/constants';
import { Link } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }
  signout(event) {
    event.preventDefault();
    this.props.signout();
    this.props.router.replace('/auth/signin');
  }
  render() {
    let singOutBlock = null;
    let nav = null;
    if (this.props.auth.get('signedIn')) {
      singOutBlock = <SignOut user={this.props.auth.get('user')} signout={this.signout} />;
      if (this.props.auth.get('user').get('role').get('name') === constants.ADMIN_ROLE) {
        nav = <Navigation />;
      }
    }
    return (
      <div className="header">
        <div className="logo">
          <Link to="/">CSS Quick Draw</Link>
        </div>
        {nav}
        {singOutBlock}
      </div>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object,
  signout: PropTypes.func,
  router: PropTypes.object,
};

export default Header;
