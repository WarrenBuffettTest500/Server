const portfolioItemService = require('../services/portfolioItem.service');
const RESPONSE = require('../constants/responses');

exports.createPortfolioItem = async (req, res, next) => {
  const userUid = req.params.user_id;
  const { symbol, avgPrice, quantity } = req.body;

  try {
    const newportfolioItem = await portfolioItemService.create({
      symbol,
      avgPrice,
      quantity,
      userUid,
    });

    res.status(201).json({
      result: RESPONSE.OK,
      portfolioItem: newportfolioItem,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPortfolio = async (req, res, next) => {
  const userUid = req.params.user_id;

  try {
    const portfolio = await portfolioItemService.findUserStocks(userUid);

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
    await portfolioItemService.delete(req.params.portfolio_item_id);

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
      = await portfolioItemService.update(req.params.portfolio_item_id, req.body);

    res.status(200).json({
      result: RESPONSE.OK,
      portfolioItem: updatedPortfolioItem,
    });
  } catch (error) {
    next(error);
  }
};
