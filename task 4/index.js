var constants = require("./constants");

const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const getProcessingPage = async (statesArray) => {
  const stateObjects = [];

  await asyncForEach(statesArray, async (currentState) => {
    const { state, errorCode } = currentState;
    const stateObject = await getStateObject(state, errorCode);

    if (stateObject) {
      stateObjects.push(stateObject);
    }
  });

  console.log(stateObjects);
  return stateObjects;
};

const getStateObject = async (state, errorCode) => {
  switch (state) {
    case constants.PROCESSING_STATE:
      await waitFor(constants.PROCESSING_TIMEOUT_MS);
      return;
    case constants.SUCCESS_STATE:
      return constants.SUCCESS_STATE_OBJECT;
    case constants.ERROR_STATE:
      return constants.mapErrorCodeToStateObject(errorCode);
    default:
      return;
  }
};

getProcessingPage([
  { state: constants.PROCESSING_STATE },
  { state: constants.ERROR_STATE },
]);

// getProcessingPage([{ state: constants.PROCESSING_STATE}, { state: constants.ERROR_STATE, errorCode: constants.INCORRECT_DETAILS_ERROR_CODE}]);

module.exports = getProcessingPage;
