module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    "member",
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
      cpf: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  );

  Member.associate = models => {
    Member.hasMany(models.incoming);
  };

  //Caso faça alguma alteração na estrutura da tabela, descomente esta linha para sincronizar com o banco de dados
  //Member.sync({alter: true}); //Se não quiser remover todos os dados
  //Member.sync({force: true}); //Se quiser deletar a tabela e cria-la novamente

  return Member;
};
