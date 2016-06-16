import constants from '../constants/constants';
import fetch from 'isomorphic-fetch';

function signInRequest(username, password) {
  return {
    type: constants.SIGNIN_REQUEST,
    username,
    password,
  };
}

function signInSuccess(token, user) {
  return {
    type: constants.SIGNIN_SUCCESS,
    user,
    token,
  };
}

function signInFailure(error) {
  return {
    type: constants.SIGNIN_FAILURE,
    error,
  };
}

export function authenticate(user, token) {
  return {
    type: constants.AUTH,
    user,
    token,
  };
}

export function loginUser(username, password) {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    dispatch(signInRequest(username, password));
    return fetch('api/signin', options)
      .then((response) => {
        response.json().then(data => {
          if (response.ok) {
            localStorage.setItem('auth', JSON.stringify({
              user: data.user,
              token: data.jwt,
            }));
            dispatch(signInSuccess(data.jwt, data.user));
          } else {
            dispatch(signInFailure(data.message));
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function signout() {
  localStorage.removeItem('auth');
  return {
    type: constants.SIGNOUT,
  };
}
