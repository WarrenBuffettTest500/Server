const StockData = (sequelize, DataTypes) => {
  return sequelize.define('stockData', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('symbol', value.toUpperCase());
      },
      get() {
        const rawValue = this.getDataValue('symbol');
        return rawValue ? rawValue.toUpperCase() : null;
      },
    },
    avgPrice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};

module.exports = StockData;
