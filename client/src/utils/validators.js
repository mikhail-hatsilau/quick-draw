function required(value) {
  return !value.trim() ? 'This field is required' : '';
}

function answareslistValidation(value) {
  const regExp = /^(\d+,)*\d+$/;
  return !regExp.test(value) ? 'Field has invalid format' : '';
}

function deprecatedSelectorsValidation(value) {
  const regExp = /^((\S,)*\S)?$/;
  return !regExp.test(value) ? 'Field has invalid format' : '';
}

function timeValidation(value) {
  const regExp = /^\d*$/;
  return !regExp.test(value) ? 'Time has invalid format' : '';
}

export default {
  required,
  answareslistValidation,
  deprecatedSelectorsValidation,
  timeValidation,
};
