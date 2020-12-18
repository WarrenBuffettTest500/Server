const { User } = require('../models');
const { sequelize } = require('../models');

exports.findByEmail = async email => {
  try {
    return await User.findOne({
      where: { email }
    });
  } catch (error) {
    throw error;
  }
};

exports.findByUid = async uid => {
  try {
    return await User.findOne({
      where: { uid }
    });
  } catch (error) {
    throw error;
  }
};

exports.create = async userInfo => {
  const { email, uid, displayName, photoURL } = userInfo;
  try {
    return await User.create({
      uid,
      email,
      displayName,
      photoURL,
      preferenceInfo: null,
    });
  } catch (error) {
    throw error;
  }
};

exports.updateUserPreferenceInfoId = async (uid, preferenceInfoId) => {
  try {
    await User.update({
      preferenceInfoId
    }, {
      where: { uid },
    });

    return await User.findOne({
      where: { uid },
    });
  } catch (error) {
    throw error;
  }
};

exports.getAll = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    throw error;
  }
};

exports.getAllRandomly = async () => {
  try {
    return await User.findAll({
      order: sequelize.random(),
    });
  } catch (error) {
    throw error;
  }
};
