const { StockData } = require('../models');

exports.create = async data => {
  try {
    return await StockData.create(data);
  } catch (error) {
    throw error;
  }
};

exports.findUserStocks = async userUid => {
  try {
    return await StockData.findAll({
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
    await StockData.destroy({
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

    await StockData.update({
      symbol,
      avgPrice,
      quantity,
    }, {
      where: { id },
    });

    return await StockData.findByPk(id);
  } catch (error) {
    throw error;
  }
};
