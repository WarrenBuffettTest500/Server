const CompanyProfile = (sequelize, DataTypes) => {
  return sequelize.define('companyProfile', {
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0',
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '-',
    },
    fullTimeEmployees: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '-',
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '-',
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '-',
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '-',
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '-',
    },
    maxAge: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '-',
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '-',
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '-',
    },
    marketCap: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    timestamps: false,
  });
};

module.exports = CompanyProfile;
