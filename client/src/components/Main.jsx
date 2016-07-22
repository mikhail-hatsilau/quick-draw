import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import HeaderContainer from '../containers/HeaderContainer';

class Main extends React.Component {
  render() {
    const authPage = this.props.routes[this.props.routes.length - 1].path.indexOf('auth') !== -1;
    const classes = classNames('main', { auth: authPage });
    return (
      <div className={classes}>
        {!authPage && <HeaderContainer />}
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.element,
  routes: PropTypes.array,
};

export default withRouter(Main);
