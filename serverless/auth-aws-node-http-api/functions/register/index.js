const { sendResponse } = require("../../responses/responses");

exports.handler = async (event) => {
  return sendResponse({ message: "Register successful" });
};
