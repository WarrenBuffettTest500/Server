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
