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
        type: DataTypes.STRING(500),
        allowNull: false
      },
      cpf: DataTypes.STRING(20)
    },
    {
      freezeTableName: true
    }
  );

  Member.associate = models => {
    Member.hasMany(models.incoming);
  };

  //Caso faça alguma alteração na estrutura da tabela, descomente uma das linhas de sincronização no index.js desta pasta

  return Member;
};
