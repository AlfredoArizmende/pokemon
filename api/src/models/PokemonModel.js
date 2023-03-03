const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z]+$/
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  },
  {
    timestamps: false
  });
};
