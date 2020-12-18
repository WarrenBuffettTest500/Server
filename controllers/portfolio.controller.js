const portfolioItemService = require('../services/portfolioItem.service');
const userService = require('../services/user.service');
const RESPONSE = require('../constants/responses');
const calculateNeighborDistancesByPreference = require('../utils/calculateNeighborDistancesByPreference');
const calculateCosineSimilaritiesByPortfolio = require('../utils/calculateCosineSimilaritiesByPortfolio');
const { LIMIT } = require('../constants/numbers');

exports.getPortfolio = async (req, res, next) => {
  const userUid = req.params.user_id;

  try {
    const portfolio = await portfolioItemService.getOne(userUid);

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
  const offset = Number(req.query.page) * LIMIT;

  try {
    const allUsersSortedByDistance = await calculateNeighborDistancesByPreference(user_id);
    const portfolios = [];

    for (let i = 0; i < allUsersSortedByDistance.length; i++) {
      const { userUid } = allUsersSortedByDistance[i];

      const portfolio = await portfolioItemService.getOne(userUid);

      if (!portfolio.length) continue;

      portfolios.push({
        owner: userUid,
        items: portfolio,
      });
    }

    res.status(200).json({
      result: RESPONSE.OK,
      portfolios: portfolios.slice(offset, offset + LIMIT),
      hasMore: portfolios.length > offset + LIMIT ? true : false,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPortfolioRecommendationsByPortfolio = async (req, res, next) => {
  const { user_id } = req.params;
  const offset = Number(req.query.page) * LIMIT;

  try {
    const allPortfoliosSortedByCosineSimilarity = await calculateCosineSimilaritiesByPortfolio(user_id);

    const sortedPortfoliosFilterd
      = allPortfoliosSortedByCosineSimilarity.filter(portfolio => portfolio.similarity);

    res.status(200).json({
      result: RESPONSE.OK,
      portfolios: sortedPortfoliosFilterd.slice(offset, offset + LIMIT),
      hasMore: sortedPortfoliosFilterd.length > offset + LIMIT ? true : false,
    });
  } catch (error) {
    next(error);
  }
};

exports.getRandomPortfolios = async (req, res, next) => {
  const allUsers = await userService.getAllRandomly();
  const users = JSON.parse(JSON.stringify(allUsers));
  const randomPortfolios = [];
  let index = 0;

  try {
    while (randomPortfolios.length < 9) {
      index++;

      const { uid } = users[index];
      const portfolio = await portfolioItemService.getOne(uid);

      if (!portfolio.length) continue;

      randomPortfolios.push({
        owner: uid,
        items: portfolio,
      });
    }

    res.status(200).json({
      result: RESPONSE.OK,
      portfolios: randomPortfolios,
    });
  } catch (error) {
    next(error);
  }
};
