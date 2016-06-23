function required(value) {
  return !value.trim() ? 'This field is required' : '';
}

export default {
  required,
};
