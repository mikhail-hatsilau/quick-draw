import React, { PropTypes } from 'react';
import { Link } from 'react-router';


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
    let singOutBlock;
    let nav;
    if (this.props.auth.get('signedIn')) {
      singOutBlock = (
        <div className="right">
          <span>{this.props.auth.get('user').get('username')}</span>
          <a href="" onClick={this.signout}>Sign out</a>
        </div>
      );
      if (this.props.auth.get('user').get('role').get('name') === 'admin') {
        nav = (
          <ul>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        );
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
