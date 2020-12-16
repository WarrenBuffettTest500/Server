const { Hit } = require('../models');
const { Op } = require('sequelize');

exports.create = async (symbol, userByCookie) => {
  const data = { symbol, userByCookie };

  try {
    return await Hit.create(data);
  } catch (error) {
    throw error;
  }
};

exports.getPast = async (symbol, userByCookie) => {
  try {
    return await Hit.findOne({
      where: {
        symbol,
        userByCookie,
      }
    });
  } catch (error) {
    throw error;
  }
};

exports.updateUpdatedAt = async pastHit => {
  try {
    pastHit.changed('updatedAt', true);

    return await pastHit.update({
      updatedAt: new Date(),
    });
  } catch (error) {
    throw error;
  }
};

exports.getAllWithInTime = async time => {
  try {
    return await Hit.findAll({
      where: {
        updatedAt: {
          [Op.gte]: Date.now() - time,
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.destroyOld = async time => {
  try {
    Hit.destroy({
      where: {
        updatedAt: {
          [Op.lt]: Date.now() - time,
        },
      },
    });

    console.log(`Hits older than ${time}ms destroyed`);
  } catch (error) {
    throw error;
  }
};
