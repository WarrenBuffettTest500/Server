const { PreferenceInfo } = require('../models');

exports.findById = async id => {
  try {
    return await PreferenceInfo.findByPk(id);
  } catch (error) {
    throw error;
  }
};

exports.create = async preferenceData => {
  try {
    return await PreferenceInfo.create(preferenceData);
  } catch (error) {
    throw error;
  }
};

exports.update = async (userUid, preferenceData) => {
  try {
    await PreferenceInfo.update(preferenceData, {
      where: { userUid },
    });

    return await PreferenceInfo.findOne({
      where: { userUid },
    });
  } catch (error) {
    throw error;
  }
};
