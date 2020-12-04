module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    email: {
      type: DataTypes.STRING(20),
      unique: true,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.STRING,
    },
    displayName: {
      type: DataTypes.STRING,
    },
    photoURL: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
  })
};
