module.exports = (sequelize, DataTypes) => {
  const IncomeType = sequelize.define(
    'expenseType',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      note: DataTypes.STRING(5000)
    },
    {
      freezeTableName: true
    }
  );

  IncomeType.associate = models => {
    IncomeType.hasMany(models.expense);
  };

  // Caso faça alguma alteração na estrutura da tabela,
  // descomente uma das linhas de sincronização no index.js desta pasta

  return IncomeType;
};
