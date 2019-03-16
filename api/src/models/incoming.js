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

  //Caso faça alguma alteração na estrutura da tabela, descomente esta linha para sincronizar com o banco de dados
  //Incoming.sync({alter: true}); //Se não quiser remover todos os dados
  //Incoming.sync({force: true}); //Se quiser deletar a tabela e cria-la novamente

  return Incoming;
};
