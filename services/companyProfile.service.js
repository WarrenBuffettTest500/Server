const { CompanyProfile, sequelize } = require('../models');
const { wrapperRequest } = require('../utils/wrapperRequest');
const { Op } = require('sequelize');

exports.findbyKeyWord = async (keyWord, intervalTime) => {
  const interval = intervalTime === 'undefined' ? '1day' : intervalTime;

  try {
    const hasTicker = await CompanyProfile.findOne({
      where: { symbol: keyWord }
    });

    if (!hasTicker) return;

    const options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/time_series',
      qs: { symbol: keyWord, interval, outputsize: '30', format: 'json' },
      headers: {
        'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
        'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
        useQueryString: true
      }
    };

    const stockDetail = await wrapperRequest(options);

    if (!stockDetail) return;

    return stockDetail;
  } catch (error) {
    throw error;
  }
};

exports.findOne = async keyWord => {
  try {
    return await CompanyProfile.findOne({
      attributes: ['sector', 'industry', 'marketCap'],
      where: { symbol: keyWord }
    });
  } catch (error) {
    throw error;
  }
};

exports.findAll = async (keyWord, sector, industry, marketCap) => {
  try {
    return await CompanyProfile.findAll({
      attributes: ['symbol'],
      where: {
        [Op.and]: [
          { sector },
          { industry },
          { views: { [Op.gte]: 1 } },
          {
            marketCap: {
              [Op.gte]: marketCap * 0.5,
              [Op.lt]: marketCap * 1.5,
            }
          },
          { symbol: { [Op.not]: keyWord } }
        ],
      }
    });
  } catch (error) {
    throw error;
  }
};

exports.update = async symbol => {
  try {
    return await CompanyProfile.update(
      {
        views: sequelize.literal('views + 1'),
      }, {
      where: { symbol },
    }
    );
  } catch (error) {
    throw error;
  }
};
