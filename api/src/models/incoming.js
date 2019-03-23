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

  Incoming.associate = models => {
    Incoming.belongsTo(models.member);
  };

  //Caso faça alguma alteração na estrutura da tabela, descomente uma das linhas de sincronização no index.js desta pasta

  return Incoming;
};
