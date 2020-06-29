import authHelpers from '../../helpers/auth';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'This email already exists!',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: 8,
            msg: 'password length must be at least 8 characters long',
          },
        },
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetTokenExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {}
  );
  User.beforeCreate((user) => {
    // eslint-disable-next-line no-param-reassign
    user.password = authHelpers.hashPassword(user.password);
  });

  // eslint-disable-next-line func-names
  User.prototype.toJSON = function () {
    const values = { ...this.get() };

    delete values.password;
    return values;
  };
  User.associate = (models) => {
    const { AddressBook, Contact } = models;

    User.hasOne(Contact, {
      foreignKey: 'userId',
    });

    User.hasOne(AddressBook, {
      foreignKey: 'userId',
    });
  };
  return User;
};
