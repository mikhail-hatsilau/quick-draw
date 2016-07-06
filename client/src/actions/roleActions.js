import constants from '../constants/actionConstants';
import fetch from 'isomorphic-fetch';

function getRolesSuccess(roles) {
  return {
    type: constants.GET_ROLES_SUCCESS,
    roles,
  };
}

function getRolesRequest() {
  return {
    type: constants.GET_ROLES_REQUEST,
  };
}

export function getRoles(token) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token,
      },
    };
    dispatch(getRolesRequest());
    return fetch('api/roles', options)
      .then(response => response.json())
      .then(data => {
        dispatch(getRolesSuccess(data.roles));
      });
  };
}