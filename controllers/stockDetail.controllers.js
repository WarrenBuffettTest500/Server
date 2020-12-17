const companyProfileService = require('../services/companyProfile.service');
const RESPONSE = require('../constants/responses');

exports.findStockDetails = async (req, res, next) => {
  const { keyword, interval } = req.params;

  try {
    const stockDetails = await companyProfileService.findbyKeyWord(keyword, interval);

    if (!stockDetails) {
      res.status(200).json({
        result: RESPONSE.FAILURE,
        message: 'not found'
      });

      return;
    }

    res.status(200).json({
      result: RESPONSE.OK,
      stockDetails
    });
  } catch (error) {
    console.error(error);
  }
};
