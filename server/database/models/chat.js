module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    'Chat',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      connectionId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      parentId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      message: DataTypes.STRING,
      senderName: DataTypes.STRING,
      file: DataTypes.STRING,
    },
    {}
  );
  Chat.associate = (models) => {
    const { Connection, User } = models;

    Chat.belongsTo(User, {
      foreignKey: 'userId',
    });
    Chat.belongsTo(Connection, {
      foreignKey: 'connectionId',
    });
  };
  return Chat;
};
