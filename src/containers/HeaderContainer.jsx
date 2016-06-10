import { connect } from 'react-redux';
import Header from '../components/Header';
import { signout } from '../actions/actionCreators';

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(signout()),
});
const mapStateToProps = (state) => (
  {
    user: state.user,
  }
);

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
