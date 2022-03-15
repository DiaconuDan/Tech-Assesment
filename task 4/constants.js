const PROCESSING_TIMEOUT_MS = 2000;

const PROCESSING_STATE = "processing";
const ERROR_STATE = "error";
const SUCCESS_STATE = "success";

const NO_STOCK_ERROR_CODE = "NO_STOCK";
const INCORRECT_DETAILS_ERROR_CODE = "INCORRECT_DETAILS";

function StateObject(title, message) {
  this.title = title;
  this.message = message;
}

const SUCCESS_STATE_OBJECT = new StateObject("Order complete", null);

const NO_STOCK_ERROR_STATE_OBJECT = new StateObject(
  "Error page",
  "No stock has been found"
);
const INCORRECT_DETAILS_ERROR_STATE_OBJECT = new StateObject(
  "Error page",
  "Incorrect details have been entered"
);
const NULL_OR_UNDEFINED_ERROR_STATE_OBJECT = new StateObject(
  "Error page",
  null
);

const mapErrorCodeToStateObject = (errorCode) => {
  if (!errorCode) {
    return NULL_OR_UNDEFINED_ERROR_STATE_OBJECT;
  }

  switch (errorCode) {
    case NO_STOCK_ERROR_CODE:
      return NO_STOCK_ERROR_STATE_OBJECT;
    case INCORRECT_DETAILS_ERROR_CODE:
      return INCORRECT_DETAILS_ERROR_STATE_OBJECT;
    default:
      return;
  }
};

module.exports = Object.freeze({
  PROCESSING_TIMEOUT_MS,
  PROCESSING_STATE,
  ERROR_STATE,
  SUCCESS_STATE,
  SUCCESS_STATE_OBJECT,
  NO_STOCK_ERROR_STATE_OBJECT,
  INCORRECT_DETAILS_ERROR_STATE_OBJECT,
  NULL_OR_UNDEFINED_ERROR_STATE_OBJECT,
  NO_STOCK_ERROR_CODE,
  INCORRECT_DETAILS_ERROR_CODE,
  mapErrorCodeToStateObject,
});
