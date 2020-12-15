const hitService = require('../services/hit.service');
const { THIRTY_MINUTES } = require('../constants/numbers');

exports.createHit = async (req, res, next) => {
  const { symbol } = req.params;
  const { buffettTest500: userByCookie } = req.cookies;

  try {
    const pastHit = await hitService.getPast(symbol, userByCookie);

    if (
      pastHit
      && Date.now() - pastHit.updatedAt < THIRTY_MINUTES
    ) {
      res.status(200).json({
        result: 'ok',
        message: 'required time has not yet passed',
      });

      return;
    }

    if (pastHit) {
      await hitService.updateUpdatedAt(pastHit);
    } else {
      await hitService.create(symbol, userByCookie);
    }

    res.status(200).json({
      result: 'ok',
    });
  } catch (error) {
    next(error);
  }
};

exports.getTrendingStocks = async (req, res, next) => {
  let allHits;

  try {
    allHits = await hitService.getAll();
  } catch (error) {
    next(error);
  }

  const hitsTable = {};

  allHits.forEach(hit => {
    const { symbol } = hit;

    if (!hitsTable.hasOwnProperty(symbol)) {
      hitsTable[symbol] = 0;
    }

    hitsTable[symbol]++;
  });

  const hitsSorted = Object.entries(hitsTable).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const result = [];

  hitsSorted.forEach(hitDataArray => {
    result.push(hitDataArray[0]);
  });

  try {
    res.status(200).json({
      result: 'ok',
      topTen: result,
    });
  } catch (error) {
    next(error);
  }
};
