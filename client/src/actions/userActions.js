import constants from '../constants/actionConstants';
import fetch from 'isomorphic-fetch';

function getUsersRequest() {
  return {
    type: constants.GET_USERS_REQUEST,
  };
}

function getUsersSuccess(users) {
  return {
    type: constants.GET_USERS_SUCCESS,
    users,
  };
}

export function getUsers(token) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token,
      },
    };
    dispatch(getUsersRequest());
    return fetch('api/users', options)
      .then(response => response.json())
      .then(data => {
        dispatch(getUsersSuccess(data.users));
      });
  };
}

function addUserRequest() {
  return {
    type: constants.ADD_USER_REQUEST,
  };
}

function addUserSuccess(user) {
  return {
    type: constants.ADD_USER_SUCCESS,
    user,
  };
}

function addUserFailure(error) {
  return {
    type: constants.ADD_USER_FAILURE,
    error,
  };
}

export function addUser(user, token) {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token,
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        roleId: user.role,
      }),
    };
    dispatch(addUserRequest());
    return fetch('api/users', options)
      .then(response => {
        response.json().then(data => {
          if (response.ok) {
            dispatch(addUserSuccess(data.user));
          } else {
            dispatch(addUserFailure(data.message));
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function deleteUserRequest() {
  return {
    type: constants.DELETE_USER_REQUEST,
  };
}

function deleteUserSuccess(userId) {
  return {
    type: constants.DELETE_USER_SUCCESS,
    userId,
  };
}

function deleteUserFailure(error) {
  return {
    type: constants.DELETE_USER_FAILURE,
    error,
  };
}

export function deleteUser(id, token) {
  return dispatch => {
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token,
      },
    };
    dispatch(deleteUserRequest());
    return fetch('api/users/' + id, options)
      .then(response => {
        response.json().then(data => {
          if (response.ok) {
            dispatch(deleteUserSuccess(id));
          } else {
            dispatch(deleteUserFailure(data.message));
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

function updateUserRequest() {
  return {
    type: constants.UPDATE_USER_REQUEST,
  };
}

function updateUserSuccess(user) {
  return {
    type: constants.UPDATE_USER_SUCCESS,
    user,
  };
}

function updateUserFailure(error) {
  return {
    type: constants.UPDATE_USER_FAILURE,
    error,
  };
}

export function updateUser(id, userModel, token) {
  return dispatch => {
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token,
      },
      body: JSON.stringify({
        username: userModel.username,
        password: userModel.password || '',
        role: userModel.role,
      }),
    };
    dispatch(updateUserRequest());
    return fetch('api/users/' + id, options)
      .then(response => {
        response.json().then(data => {
          if (response.ok) {
            dispatch(updateUserSuccess(data.user));
          } else {
            dispatch(updateUserFailure(data.message));
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}
