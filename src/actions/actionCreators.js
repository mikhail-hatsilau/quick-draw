import constants from '../constants/constants';
import fetch from 'isomorphic-fetch';

export function signInRequest(username, password) {
  return {
    type: constants.SIGNIN_REQUEST,
    username,
    password,
  };
}

export function signInSuccess(token) {
  return {
    type: constants.SIGNIN_SUCESS,
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
      .then((response) => response.json())
      .then((data) => {
        dispatch(signInSuccess(data.jwt));
      });
  };
}

export function signout() {
  return {
    type: constants.SIGNOUT,
  };
}
