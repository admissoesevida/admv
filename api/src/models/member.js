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

  return Member;
};
