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
        type: DataTypes.DATE,
        allowNull: false
      },
      value: {
        type: DataTypes.DECIMAL(16,2),
        allowNull: false
      },
      note: DataTypes.STRING(5000)
    },
    {
      freezeTableName: true
    }
  );

  Expense.associate = models => {
    Expense.belongsTo(models.provider);
  };

  //Caso faça alguma alteração na estrutura da tabela, descomente uma das linhas de sincronização no index.js desta pasta

  return Expense;
};
