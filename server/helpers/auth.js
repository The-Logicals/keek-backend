import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Env from '../../Env';

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
};

export default authHelper;
