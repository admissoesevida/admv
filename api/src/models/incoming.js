module.exports = (sequelize, DataTypes) => {
  const Incoming = sequelize.define(
    "incoming",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      reg_date: {
        type: DataTypes.STRING,
        allowNull: false
      },
      value: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      note: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  );

  Incoming.associate = models => {
    Incoming.belongsTo(models.member);
  };

  return Incoming;
};
