module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define(
    'income',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      value: {
        type: DataTypes.DECIMAL(16, 2),
        allowNull: false
      },
      note: DataTypes.STRING(5000)
    },
    {
      freezeTableName: true
    }
  );

  Income.associate = models => {
    Income.belongsTo(models.member);
    Income.belongsTo(models.incomeType);
  };

  // Caso faça alguma alteração na estrutura da tabela,
  // descomente uma das linhas de sincronização no index.js desta pasta

  return Income;
};
