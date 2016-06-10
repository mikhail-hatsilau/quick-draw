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
  }
  render() {
    let link;
    // if (this.props.user.get('token')) {
    //   link = <a href="" onClick={this.signout}>Sign out</a>;
    // } else {
    //   link = <Link to="signin">Sign in</Link>;
    // }
    return (
      <div className="header">
        Hello Header;
        {link}
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  signout: PropTypes.func,
};

export default Header;
