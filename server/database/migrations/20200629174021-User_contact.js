module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserContacts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      // userContactId: {
      //   type: Sequelize.UUID,
      //   allowNull: false,
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => queryInterface.dropTable('UserContacts'),
};
