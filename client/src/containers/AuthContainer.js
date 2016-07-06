import { connect } from 'react-redux';
import { loginUser, signUp } from '../actions/authActions';
import Auth from '../components/Auth';
import { withRouter } from 'react-router';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => (
  {
    signIn: (username, password) => {
      dispatch(loginUser(username, password));
    },
    signUp: (username, password) => {
      dispatch(signUp(username, password));
    },
  }
);

const AuthContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth));

export default AuthContainer;
