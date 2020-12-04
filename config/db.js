const { sequelize } = require('../models');

const connectSequelize = () => {
  sequelize.sync({ force: false })
    .then(() => {
      console.log('connection');
    })
    .catch(err => {
      console.error(err);
    })
};

module.exports = connectSequelize;
