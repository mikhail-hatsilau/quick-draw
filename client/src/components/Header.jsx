import React, { PropTypes } from 'react';
import Navigation from './Navigation';
import SignOut from './SignOut';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }
  signout(event) {
    event.preventDefault();
    this.props.signout();
    this.props.router.replace('/signin');
  }
  render() {
    let singOutBlock = null;
    let nav = null;
    if (this.props.auth.get('signedIn')) {
      singOutBlock = <SignOut user={this.props.auth.get('user')} signout={this.signout} />;
      if (this.props.auth.get('user').get('role').get('name') === 'admin') {
        nav = <Navigation />;
      }
    }
    return (
      <div className="header">
        <div className="logo">CSS Quick Draw</div>
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
