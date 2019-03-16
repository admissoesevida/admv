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

  //Caso faça alguma alteração na estrutura da tabela, descomente esta linha para sincronizar com o banco de dados
  //Expense.sync({alter: true}); //Se não quiser remover todos os dados
  //Expense.sync({force: true}); //Se quiser deletar a tabela e cria-la novamente
  
  return Expense;
};
