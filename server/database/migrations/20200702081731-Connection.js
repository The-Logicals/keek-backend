module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Connections', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userOneId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      userTwoId: {
        allowNull: false,
        type: Sequelize.UUID,
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

  down: (queryInterface) => queryInterface.dropTable('Connections'),
};
