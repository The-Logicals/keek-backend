module.exports = (sequelize, DataTypes) => {
  const AddressBook = sequelize.define(
    'AddressBook',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      userId: {
        allowNull: true,
        type: DataTypes.UUID,
      },
      contactId: {
        allowNull: true,
        type: DataTypes.UUID,
      },
    },
    {}
  );

  AddressBook.associate = (models) => {
    const { User, Contact } = models;

    // associations can be defined here
    AddressBook.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId',
    });

    AddressBook.belongsTo(Contact, {
      as: 'contacts',
      foreignKey: 'contactId',
    });
  };

  return AddressBook;
};
