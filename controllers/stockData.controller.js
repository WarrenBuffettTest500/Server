const stockDataService = require('../services/stockData.service');
const RESPONSE = require('../constants/responses');

exports.createStockData = async (req, res, next) => {
  const userUid = req.params.user_id;
  const { symbol, avgPrice, quantity } = req.body;

  try {
    const newStockData = await stockDataService.create({
      symbol,
      avgPrice,
      quantity,
      userUid,
    });

    res.status(201).json({
      result: RESPONSE.OK,
      stockData: newStockData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPortfolio = async (req, res, next) => {
  const userUid = req.params.user_id;

  try {
    const portfolio = await stockDataService.findUserStocks(userUid);

    res.status(200).json({
      result: RESPONSE.OK,
      portfolio,
    });
  } catch (error) {
    next(error);
  }
};
