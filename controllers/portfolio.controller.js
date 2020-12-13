const portfolioItemService = require('../services/portfolioItem.service');
const RESPONSE = require('../constants/responses');
const calculateNeighborDistancesByPreference = require('../utils/calculateNeighborDistancesByPreference');
const calculateCosineSimilaritiesByPortfolio = require('../utils/calculateCosineSimilaritiesByPortfolio');

exports.getPortfolio = async (req, res, next) => {
  const userUid = req.params.user_id;

  try {
    const portfolio = await portfolioItemService.getPortfolio(userUid);

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
    const allUsersSortedByDistance = await calculateNeighborDistancesByPreference(user_id);
    const nearbyUsers = allUsersSortedByDistance.slice(0, 9);

    const portfolios = await Promise.all(
      nearbyUsers.map(async user => {
        const portfolio = await portfolioItemService.getPortfolio(user.userUid);

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
  const { user_id } = req.params;

  try {
    const allPortfoliosSortedByCosineSimilarity = await calculateCosineSimilaritiesByPortfolio(user_id);

    res.status(200).json({
      result: RESPONSE.OK,
      portfolios: allPortfoliosSortedByCosineSimilarity.filter(portfolio => portfolio.similarity),
    });
  } catch (error) {
    next(error);
  }
};
