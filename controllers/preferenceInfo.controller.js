const preferenceInfoService = require('../services/preferenceInfo.service');
const RESPONSE = require('../constants/responses');

exports.getPreferenceInfo = async (req, res, next) => {
  try {
    const preferenceInfo = await preferenceInfoService.findById(req.params.preference_info_id);

    res.status(200).json({
      result: RESPONSE.OK,
      preferenceInfo,
    });
  } catch (error) {
    next(error);
  }
};

exports.createPreferenceInfo = async (req, res, next) => {
  const userUid = req.params.user_id;
  const [interestedSector1, interestedSector2, interestedSector3] = req.body.interestedSectors;
  const { riskAppetite, stockProportion, preferredStockType, period } = req.body;

  try {
    const newPreferenceInfo = await preferenceInfoService.create({
      interestedSector1,
      interestedSector2,
      interestedSector3,
      riskAppetite,
      stockProportion,
      preferredStockType,
      period,
      userUid,
    });

    res.status(201).json({
      result: RESPONSE.OK,
      preferenceInfo: newPreferenceInfo,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePreferenceInfo = async (req, res, next) => {
  const userUid = req.params.user_id;
  console.log(req.body);
  const [interestedSector1, interestedSector2, interestedSector3] = req.body.interestedSectors;
  const { riskAppetite, stockProportion, preferredStockType, period } = req.body;

  try {
    const updatedPreferenceInfo = await preferenceInfoService.update(userUid, {
      interestedSector1,
      interestedSector2,
      interestedSector3,
      riskAppetite,
      stockProportion,
      preferredStockType,
      period,
    });

    res.status(200).json({
      result: RESPONSE.OK,
      preferenceInfo: updatedPreferenceInfo,
    });
  } catch (error) {
    next(error);
  }
};
