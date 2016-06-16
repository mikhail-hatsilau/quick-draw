import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import SignInForm from '../components/SignInForm';
import { withRouter } from 'react-router';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => (
  {
    signIn: (username, password) => {
      dispatch(loginUser(username, password));
    },
  }
);

const SignIn = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm));

export default SignIn;
