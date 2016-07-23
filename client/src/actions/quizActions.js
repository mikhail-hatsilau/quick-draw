import constants from '../constants/actionConstants';

export function startTest(task) {
  localStorage.setItem('currentTask', JSON.stringify(task));
  return {
    type: constants.START_TEST,
    task,
  };
}

export function incTimer(time) {
  return {
    type: constants.INC_TIMER,
    time,
  };
}

export function passTest() {
  localStorage.removeItem('currentTask');
  return {
    type: constants.PASS_TEST,
  };
}

export function updateSelector(selector) {
  return {
    type: constants.UPDATE_SELECTOR,
    selector,
  };
}
