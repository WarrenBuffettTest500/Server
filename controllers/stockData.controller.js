const stockDataService = require('../services/stockData.service');
const RESPONSE = require('../constants/responses');

exports.createPortfolioItem = async (req, res, next) => {
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

exports.deletePortfolioItem = async (req, res, next) => {
  try {
    await stockDataService.delete(req.params.portfolio_item_id);

    res.status(200).json({
      result: RESPONSE.OK,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePortfolioItem = async (req, res, next) => {
  try {
    const updatedPortfolioItem
      = await stockDataService.update(req.params.portfolio_item_id, req.body);

    res.status(200).json({
      result: RESPONSE.OK,
      portfolioItem: updatedPortfolioItem,
    });
  } catch (error) {
    next(error);
  }
};
