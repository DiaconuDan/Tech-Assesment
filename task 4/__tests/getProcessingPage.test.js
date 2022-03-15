const getProcessingPage = require("../index");
const constants = require("../constants");
const { test, expect } = require("@jest/globals");
const { performance } = require("perf_hooks");

const processingState = { state: constants.PROCESSING_STATE };
const errorState = { state: constants.ERROR_STATE };
const errorStateWithIncorrectCode = {
  state: constants.ERROR_STATE,
  errorCode: constants.INCORRECT_DETAILS_ERROR_CODE,
};
const successState = { state: constants.SUCCESS_STATE };

describe("State objects: getProcessingPage function", () => {
  test("returns correctly for: processing", () => {
    return getProcessingPage([processingState]).then((data) => {
      expect(data).toStrictEqual([]);
    });
  });
  test("return correctly for the example case: processing and error", () => {
    return getProcessingPage([processingState, errorState]).then((data) => {
      expect(data).toStrictEqual([
        constants.NULL_OR_UNDEFINED_ERROR_STATE_OBJECT,
      ]);
    });
  });
  test("return correctly for the case: processing, error, sucess", () => {
    return getProcessingPage([processingState, errorState, successState]).then(
      (data) => {
        expect(data).toStrictEqual([
          constants.NULL_OR_UNDEFINED_ERROR_STATE_OBJECT,
          constants.SUCCESS_STATE_OBJECT,
        ]);
      }
    );
  });
  test("return correctly for the case:  error with incorrect code and success", () => {
    return getProcessingPage([errorStateWithIncorrectCode, successState]).then(
      (data) => {
        expect(data).toStrictEqual([
          constants.INCORRECT_DETAILS_ERROR_STATE_OBJECT,
          constants.SUCCESS_STATE_OBJECT,
        ]);
      }
    );
  });
});

// this might not be a good fit to unit test it (this will also keep the ), but was curious to play around how a timeout test could possibly look like

describe("State objects: getProcessingPage function timeout works as expected", () => {
  test("takes 2 seconds timeout for  one processing ", () => {
    var startTime = performance.now();
    return getProcessingPage([successState, processingState]).then((data) => {
      var endTime = performance.now();
      const timeDiffInMiliseconds = endTime - startTime;

      var seconds = Number(((timeDiffInMiliseconds % 60000) / 1000).toFixed(0));

      expect(data).toStrictEqual([constants.SUCCESS_STATE_OBJECT]);
      expect(seconds).toBe(2);
    });
  });
});

describe("ErroCodes: mapErrorCodeToStateObject function", () => {
  test("returns correctly when invalid error code is provided", () => {
    expect(constants.mapErrorCodeToStateObject("invalid")).toBe(undefined);
  });
  test("returns correctly when no error code provided", () => {
    expect(constants.mapErrorCodeToStateObject(null)).toBe(
      constants.NULL_OR_UNDEFINED_ERROR_STATE_OBJECT
    );
  });
  test("returns correctly when NO_STOCK_ERROR_CODE error code is provided", () => {
    expect(
      constants.mapErrorCodeToStateObject(constants.NO_STOCK_ERROR_CODE)
    ).toBe(constants.NO_STOCK_ERROR_STATE_OBJECT);
  });
  test("returns correctly when INCORRECT_DETAILS_ERROR_CODE error code is provided", () => {
    expect(
      constants.mapErrorCodeToStateObject(
        constants.INCORRECT_DETAILS_ERROR_CODE
      )
    ).toBe(constants.INCORRECT_DETAILS_ERROR_STATE_OBJECT);
  });
});
