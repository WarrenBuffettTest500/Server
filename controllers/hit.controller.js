const hitService = require('../services/hit.service');
const { THIRTY_MINUTES, ONE_MINUTE } = require('../constants/numbers');
const RESPONSE = require('../constants/responses');

exports.createHit = async (req, res, next) => {
  const { symbol } = req.params;
  const { buffettTest500: userByCookie } = req.cookies;
  console.log(symbol, userByCookie, '000000000000000');
  try {
    console.log('111111111111111111');
    const pastHit = await hitService.getPast(symbol, userByCookie);
    console.log(pastHit, '2222222222222');
    if (pastHit && Date.now() - pastHit.updatedAt < THIRTY_MINUTES) {
      res.status(200).json({
        result: RESPONSE.OK,
        message: RESPONSE.REQUIRED_TIME_HAS_NOT_YET_PASSED,
      });

      return;
    }

    if (pastHit) {
      console.log('33333333333333333');
      await hitService.updateUpdatedAt(pastHit);
      console.log('44444444444444');
      return;
    }
    console.log('5555555555555555555');
    await hitService.create(symbol, userByCookie);
    console.log('666666666666666666666');
    res.status(200).json({
      result: RESPONSE.OK,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTrendingStocks = async (req, res, next) => {
  let allHitsWithInTime;

  try {
    allHitsWithInTime = await hitService.getAllWithInTime(ONE_MINUTE);
  } catch (error) {
    next(error);
  }

  const hitsTable = {};

  allHitsWithInTime.forEach(hit => {
    const { symbol } = hit;

    if (!hitsTable.hasOwnProperty(symbol)) {
      hitsTable[symbol] = 0;
    }

    hitsTable[symbol]++;
  });

  const hitsSorted = Object
    .entries(hitsTable)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  const result = [];

  hitsSorted.forEach(hitDataArray => {
    result.push(hitDataArray[0]);
  });

  try {
    res.status(200).json({
      result: RESPONSE.OK,
      topTen: result,
    });
  } catch (error) {
    next(error);
  }
};
