const { CompanyProfile } = require('../models');
const { wrapperRequest } = require('../utils/wrapperRequest');

exports.findbyKeyWord = async (keyWord, date) => {
  try {
    const hasTicker = await CompanyProfile.findOne({
      where: { symbol: keyWord }
    });

    if (!hasTicker) return;

    const options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/time_series',
      qs: {symbol: keyWord, interval: date || '1day', outputsize: '30', format: 'json'},
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
