
const primeNumbers = require('./primesNums').primeNumbers;
module.exports = {
  retrievePrimeNumbers(params, id) {
    // todo validation of of params in hook
    let startPosition = params.query.start ? parseInt(params.query.start) : 0;
    let maxEndPosition = params.query.limit ? startPosition + parseInt(params.query.limit) : primeNumbers.length;

    let total = 0;
    let actualEndPosition = maxEndPosition;
    let endOfPrimeNumnersToBeReturned = false;

    for (let primeNumbersPos = startPosition; primeNumbersPos < primeNumbers.length; primeNumbersPos++) {

      if (primeNumbersPos <= maxEndPosition && primeNumbers[primeNumbersPos] <= id) {
        actualEndPosition = primeNumbersPos;
      }
      if (primeNumbersPos <= maxEndPosition && primeNumbers[primeNumbersPos] > id && !endOfPrimeNumnersToBeReturned) {
        actualEndPosition = primeNumbersPos;
        endOfPrimeNumnersToBeReturned = true;
      }
      // caters for results ending on final page before page size has been reached.
      if (primeNumbers[primeNumbersPos] > id && total === 0) {
        total = id > 1 ? primeNumbersPos : 0;
      }
    }

    // return the primeNumbers
    return {
      total: total,
      offset: startPosition,
      limit: maxEndPosition,
      results: primeNumbers.slice(startPosition, actualEndPosition)
    }
  }
}
