const regExp = {
  // study-tests wants easy password pattern
  // password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
  password: /^[A-Za-z0-9]{4,}$/,
  url: /^(ftp|http|https):\/\/[^ "]+#*$/,
  mongoObjectId: /^[0-9a-fA-F]{24}$/,
};

module.exports = { regExp };
