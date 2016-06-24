import constants from '../constants/actionConstants';
import fetch from 'isomorphic-fetch';

function getParticipantsRequest() {
  return {
    type: constants.GET_PARTICIPANTS_REQUEST,
  };
}

function getParticipantsSuccess(participants) {
  return {
    type: constants.GET_PARTICIPANTS_SUCCESS,
    participants,
  };
}

function getParticipantsFailure(error) {
  return {
    type: constants.GET_PARTICIPANTS_FAILURE,
    error,
  };
}

export function getParticipants(token) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token,
      },
    };
    dispatch(getParticipantsRequest());
    return fetch('api/participants', options)
      .then(response => {
        response.json().then(data => {
          if (response.ok) {
            dispatch(getParticipantsSuccess(data.participants));
          } else {
            dispatch(getParticipantsFailure(data.message));
          }
        });
      })
      .catch(() => {
        console.log('Participants loading error');
      });
  };
}

export function addParticipant(participant) {
  return {
    type: constants.ADD_PARTICIPANT,
    participant,
  };
}

export function addResultOfParticipant(result) {
  return {
    type: constants.ADD_RESULT_OF_PARTICIPANT,
    result,
  };
}
