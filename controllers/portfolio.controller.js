const portfolioItemService = require('../services/portfolioItem.service');
const RESPONSE = require('../constants/responses');
const findNeighborDistancesByPreference = require('../utils/findNeighborDistancesByPreference');

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

exports.getPortfolioRecommendationsByPreference = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const allUsersSortedByDistance = await findNeighborDistancesByPreference(user_id);
    const nearUsers = allUsersSortedByDistance.slice(0, 9);

    const portfolios = await Promise.all(
      nearUsers.map(async user => {
        const portfolio = await portfolioItemService.findUserStocks(user.userUid);

        return {
          owner: user.userUid,
          items: portfolio,
        };
      })
    );

    res.status(200).json({
      result: RESPONSE.OK,
      portfolios,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPortfolioRecommendationsByPortfolio = async (req, res, next) => {

};
