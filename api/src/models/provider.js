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
      }
    },
    {
      freezeTableName: true
    }
  );

  Provider.associate = models => {
    Provider.hasMany(models.expense);
  };

  return Provider;
};
