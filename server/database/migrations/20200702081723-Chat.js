module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Chats', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      connectionId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      parentId: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      message: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      senderName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      file: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('Chats'),
};
