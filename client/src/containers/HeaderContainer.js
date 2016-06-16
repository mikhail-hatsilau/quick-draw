import { connect } from 'react-redux';
import Header from '../components/Header';
import { signout } from '../actions/authActions';
import { withRouter } from 'react-router';

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(signout()),
});
const mapStateToProps = (state) => (
  {
    auth: state.auth,
  }
);

const HeaderContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header));

export default HeaderContainer;
