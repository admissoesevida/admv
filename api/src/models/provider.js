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
        type: DataTypes.STRING(500),
        allowNull: false
      },
      cpf_cnpj: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      phone: {
        type: DataTypes.STRING(20),
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

  //Caso faça alguma alteração na estrutura da tabela, descomente uma das linhas de sincronização no index.js desta pasta

  return Provider;
};
