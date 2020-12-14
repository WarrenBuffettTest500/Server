const Hit = (sequelize, DataTypes) => {
  return sequelize.define('hit', {
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userByCookie: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
};

module.exports = Hit;
