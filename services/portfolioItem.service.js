const { PortfolioItem } = require('../models');

exports.create = async data => {
  try {
    return await PortfolioItem.create(data);
  } catch (error) {
    throw error;
  }
};

exports.getPortfolio = async userUid => {
  try {
    return await PortfolioItem.findAll({
      where: {
        userUid,
      }
    });
  } catch (error) {
    throw error;
  }
};

exports.delete = async portfolioItemId => {
  try {
    await PortfolioItem.destroy({
      where: {
        id: portfolioItemId,
      }
    });
  } catch (error) {
    throw error;
  }
};

exports.update = async (id, data) => {
  try {
    const { symbol, avgPrice, quantity } = data;

    await PortfolioItem.update({
      symbol,
      avgPrice,
      quantity,
    }, {
      where: { id },
    });

    return await PortfolioItem.findByPk(id);
  } catch (error) {
    throw error;
  }
};
