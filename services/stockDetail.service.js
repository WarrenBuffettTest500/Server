const { CompanyProfile } = require('../models');
const { wrapperRequest } = require('../utils/wrapperRequest');

exports.findbyKeyWord = async keyWord => {
  try {
    const hasTicker = await CompanyProfile.findOne({
      where: { symbol: keyWord }
    });

    if (!hasTicker) return;

    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      qs: {function: 'GLOBAL_QUOTE', symbol: keyWord},
      headers: {
        'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
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
