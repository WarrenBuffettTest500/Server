const { CompanyProfile } = require('../models');
const { wrapperRequest } = require('../utils/wrapperRequest');
const { Op } = require('sequelize');
const METHOD = require('../constants/method');

exports.findbyKeyWord = async (keyWord, intervalTime) => {
  const interval = intervalTime === 'undefined' ? '1day' : intervalTime;

  try {
    const hasTicker = await CompanyProfile.findOne({
      where: { symbol: keyWord }
    });

    if (!hasTicker) return;

    const options = {
      method: METHOD.GET,
      url: 'https://twelve-data1.p.rapidapi.com/time_series',
      qs: { symbol: keyWord, interval, outputsize: '30', format: 'json' },
      headers: {
        'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
        'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
        useQueryString: true
      }
    };

    return await wrapperRequest(options);;
  } catch (error) {
    throw error;
  }
};

exports.findOne = async keyWord => {
  try {
    return await CompanyProfile.findOne({
      attributes: ['sector', 'industry', 'marketCap', 'website'],
      where: { symbol: keyWord }
    });
  } catch (error) {
    throw error;
  }
};

exports.findAllSymbol = async (keyWord, sector, industry, marketCap) => {
  try {
    return await CompanyProfile.findAll({
      attributes: ['symbol'],
      where: {
        [Op.and]: [
          { sector },
          { industry },
          {
            marketCap: {
              [Op.gte]: marketCap * 0.5,
              [Op.lt]: marketCap * 1.5,
            }
          },
          { symbol: { [Op.not]: keyWord } }
        ],
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.getAll = async attribute => {
  try {
    return await CompanyProfile.findAll({
      attributes: [attribute],
    });
  } catch (error) {
    throw error;
  }
};
