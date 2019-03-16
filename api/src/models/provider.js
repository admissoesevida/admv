module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define(
    "provider",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cpf_cnpj: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      telephony: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      }
    },
    {
      freezeTableName: true
    }
  );

  Provider.associate = models => {
    Provider.hasMany(models.expense);
  };

  //Caso faça alguma alteração na estrutura da tabela, descomente esta linha para sincronizar com o banco de dados
  //Provider.sync({alter: true}); //Se não quiser remover todos os dados
  //Provider.sync({force: true}); //Se quiser deletar a tabela e cria-la novamente

  return Provider;
};
