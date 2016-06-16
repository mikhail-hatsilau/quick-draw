import { connect } from 'react-redux';
import { getRoles } from '../actions/roleActions';
import { deleteUser, getUsers, addUser } from '../actions/userActions';
import Users from '../components/Users';

const mapStateToProps = (state) => (
  {
    users: state.users,
    auth: state.auth,
    roles: state.roles,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    getUsers: (token) => {
      dispatch(getUsers(token));
    },
    getRoles: (token) => {
      dispatch(getRoles(token));
    },
    deleteUser: (id, token) => {
      dispatch(deleteUser(id, token));
    },
    addUser: (user, token) => {
      dispatch(addUser(user, token));
    },
  }
);

const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);

export default UsersContainer;
