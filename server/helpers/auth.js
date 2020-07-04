import jwt, { decode } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Env from '../../Env';
import model from '../database/models';

const { User } = model;

const secret = Env.get('SECRETKEY');

const authHelper = {
  /**
   * @method encode
   * @description
   * @param {dataObject} data to be encoded
   * @returns {token} encoded user token
   */
  encode: (data) => {
    const token = jwt.sign(data, secret, { expiresIn: '72h' });
    return token;
  },

  hashPassword: (password) => {
    return bcrypt.hashSync(password, 10);
  },

  comparePassword: async (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
  },

  decode: (token) => {
    const isVerified = jwt.verify(token, secret);
    return isVerified;
  },

  // eslint-disable-next-line consistent-return
  socketAuth: async (token, socket, io) => {
    try {
      if (!token) {
        io.to(socket.id).emit('login_error', {
          message: 'Access denied, please login to have access',
        });
      }

      const { email } = decode(token);
      const user = await User.findOne({
        where: { email },
        attributes: {
          exclude: ['password'],
        },
      });

      if (!user)
        io.to(socket.id).emit('login_error', {
          message: 'User not found please sign up',
        });

      io.to(socket.id).emit('login_success', {
        message: 'connection successful',
      });

      return user.dataValues;
    } catch (e) {
      console.log(e);
      io.to(socket.id).emit('login_error', { message: 'Please login' });
    }
  },
};

export default authHelper;
