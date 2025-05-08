function sendResponse(data) {
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}

function sendError(statusCode, error) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(error),
  };
}

module.exports = {
  sendResponse,
  sendError,
};