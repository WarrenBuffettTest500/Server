const { sequelize } = require('../models');

const connectSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log('database connected');
    sequelize.sync({ force: false });
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectSequelize;
