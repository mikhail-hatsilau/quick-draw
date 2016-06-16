import React, { PropTypes } from 'react';
import HeaderContainer from '../containers/HeaderContainer';

class Main extends React.Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        {this.props.children}
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.element,
};

export default Main;
