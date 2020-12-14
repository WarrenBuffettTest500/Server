const CompanyProfile = (sequelize, DataTypes) => {
  return sequelize.define('companyProfile', {
    zip: {
      type: DataTypes.STRING,
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullTimeEmployees: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxAge: {
      type: DataTypes.INTEGER,
    },
    address1: {
      type: DataTypes.STRING,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marketCap: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};

module.exports = CompanyProfile;
