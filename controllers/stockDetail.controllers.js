const stockDetailService = require('../services/stockDetail.service');
const RESPONSE = require('../constants/responses');

exports.findStockDetails = async (req, res, next) => {
  const { keyword } = req.params;

  try {
    const stockDetails = await stockDetailService.findbyKeyWord(keyword);

    if (!stockDetails) {
      res.status(200).json({ result: RESPONSE.FAILURE });
      return;
    }

    res.status(200).send({ result: RESPONSE.OK, stockDetails });
  } catch (error) {
    console.error(error);
  }
};
