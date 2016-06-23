import constants from '../constants/constants';
import fetch from 'isomorphic-fetch';

function getTasksRequest() {
  return {
    type: constants.GET_TASKS_REQUEST,
  };
}

function getTasksSuccess(tasks) {
  return {
    type: constants.GET_TASKS_SUCCESS,
    tasks,
  };
}

function getTasksFailure(error) {
  return {
    type: constants.GET_TASKS_FAILURE,
    error,
  };
}

export function getTasks(token) {
  return (dispatch) => {
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token,
      },
    };
    dispatch(getTasksRequest());
    return fetch('api/tasks', options)
      .then(response => {
        response.json().then(data => {
          if (response.ok) {
            dispatch(getTasksSuccess(data.tasks));
          } else {
            dispatch(getTasksFailure(data.message));
          }
        });
      })
      .catch(() => {
        console.log('Tasks loading error');
      });
  };
}

function addTaskRequest() {
  return {
    type: constants.ADD_TASK_REQUEST,
  };
}

function addTaskSuccess(task) {
  return {
    type: constants.ADD_TASK_SUCCESS,
    task,
  };
}

function addTaskFailure(error) {
  return {
    type: constants.ADD_TASK_FAILURE,
    error,
  };
}

export function addTask(task, token) {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token,
      },
      body: JSON.stringify({
        name: task.name,
        code: task.code,
        answare: task.answare,
      }),
    };
    dispatch(addTaskRequest());
    return fetch('api/tasks', options)
      .then(response => {
        response.json().then(data => {
          if (response.ok) {
            dispatch(addTaskSuccess(data.task));
          } else {
            dispatch(addTaskFailure(data.message));
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function deleteTaskRequest() {
  return {
    type: constants.DELETE_TASK_REQUEST,
  };
}

function deleteTaskSuccess(taskId) {
  return {
    type: constants.DELETE_TASK_SUCCESS,
    taskId,
  };
}

function deleteTaskFailure(error) {
  return {
    type: constants.DELETE_TASK_FAILURE,
    error,
  };
}

export function deleteTask(id, token) {
  return dispatch => {
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token,
      },
    };
    dispatch(deleteTaskRequest());
    return fetch('api/tasks/' + id, options)
      .then(response => {
        response.json().then(data => {
          if (response.ok) {
            dispatch(deleteTaskSuccess(id));
          } else {
            dispatch(deleteTaskFailure(data.message));
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

function updateTaskRequest() {
  return {
    type: constants.UPDATE_TASK_REQUEST,
  };
}

function updateTaskSuccess(task) {
  return {
    type: constants.UPDATE_TASK_SUCCESS,
    task,
  };
}

function updateTaskFailure(error) {
  return {
    type: constants.UPDATE_TASK_FAILURE,
    error,
  };
}

export function updateTask(id, taskModel, token) {
  return dispatch => {
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token,
      },
      body: JSON.stringify(taskModel),
    };
    dispatch(updateTaskRequest());
    return fetch('api/tasks/' + id, options)
      .then(response => {
        response.json().then(data => {
          if (response.ok) {
            dispatch(updateTaskSuccess(data.task));
          } else {
            dispatch(updateTaskFailure(data.message));
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}
