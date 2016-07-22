import React, { PropTypes } from 'react';

function SignOut(props) {
  return (
    <div className="signout right">
      <span>User: {props.user.get('username')}</span>
      <a href="" onClick={props.signout}>Sign out</a>
    </div>
  );
}

SignOut.propTypes = {
  signout: PropTypes.func,
  user: PropTypes.object,
};

export default SignOut;
