const errorMap = {
  'number.empty': 400,
  'number.greater': 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};