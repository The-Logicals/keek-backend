module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'Contact',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    },
    {}
  );

  Contact.associate = (models) => {
    const { User, AddressBook } = models;

    // associations can be defined here
    Contact.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId',
    });

    Contact.hasMany(AddressBook, {
      as: 'contacts',
      foreignKey: 'contactId',
    });
  };
  return Contact;
};
