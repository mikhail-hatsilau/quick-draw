function required(value) {
  return !value.trim() ? 'This field is required' : '';
}

function listValidation(value) {
  const regExp = /^(\d+,{1})+\d$/;
  console.log(regExp.test(value));
  return !regExp.test(value) ? 'Field has invalid format' : '';
}

export default {
  required,
  listValidation,
};
