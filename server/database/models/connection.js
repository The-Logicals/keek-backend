module.exports = (sequelize, DataTypes) => {
  const Connection = sequelize.define(
    'Connection',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      userOneId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      userTwoId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    },
    {}
  );
  Connection.associate = (models) => {
    const { Chat } = models;

    Connection.hasMany(Chat, {
      foreignKey: 'connectionId',
      as: 'chats',
      onDelete: 'CASCADE',
    });
  };
  return Connection;
};
