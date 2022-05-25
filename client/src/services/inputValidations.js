function validateEmail(email) {
  // regex from w3docs.com
  const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}

const validateField = (fieldText, min, max) => {
  return fieldText.length >= min && fieldText.length <= max;
};

const validatePassword = (password) => {
  return validateField(password, 10, 64);
};

const validateUsername = (username) => {
  return validateField(username, 6, 64);
};

export default {
  validateEmail, validatePassword, validateUsername,
};
