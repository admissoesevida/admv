module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define(
    "expense",
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

  Expense.associate = models => {
    Expense.belongsTo(models.provider);
  };

  return Expense;
};
