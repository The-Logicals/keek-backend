import { authService } from '../services/authService';
import authHelper from '../helpers/auth';
import notifications from '../helpers/notifications';
import Env from '../../Env';

const REGISTRATION_URL = Env.get('REGISTRATION_URL');

/**
 * @class AuthController
 */
export default class AuthController {
  /**
   * @method register
   * @description registers a user with their email
   * @param {*} req
   * @param {*} res
   * @returns {object} registered user
   */
  static async register(req, res) {
    try {
      const { body } = req;

      const user = await authService.create(body);

      const { id, email, isVerified, username } = user;
      const verificationToken = authHelper.encode({
        id,
        email,
        username,
        isVerified,
      });

      const verificationLink = `${REGISTRATION_URL}?token=${verificationToken}`;
      await notifications.registrationEmail(email, verificationLink, username);

      return res.status(200).send({
        status: true,
        token: verificationToken,
        user,
        message: `We've sent an email to ${email}. Follow the link in your email to verify your account`,
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: 'something went wrong',
        error: error.message,
      });
    }
  }

  /**
   * @description - this method verity's a user by email
   *
   * @param {object} req - The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   *
   * @returns {object} - object
   */
  static async verifyEmail(req, res) {
    try {
      const { token } = req.query;

      const decodedToken = authHelper.decode(token);
      const { email } = decodedToken;

      const user = await authService.find({ email });

      if (user.isVerified) {
        return res.status(409).json({
          status: false,
          message: 'Your account has already been verified',
        });
      }

      await authService.update({ isVerified: true }, { id: user.id });
      return res.status(200).json({
        status: true,
        message: 'Account verification was successful',
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: 'something went wrong',
        error: error.message,
      });
    }
  }

  /**
   * @description - this method logs in a user
   *
   * @param {object} req - The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   *
   * @returns {object} - object
   */
  static async login(req, res) {
    try {
      const { password } = req.body;
      const {
        user,
        user: { id, email, password: hashedPassword, isVerified },
      } = req;

      const verifiedPassword = await authHelper.comparePassword(
        password,
        hashedPassword
      );

      if (!verifiedPassword) {
        return res.status(401).send({
          status: false,
          error: 'Bad Login',
        });
      }

      const token = authHelper.encode({
        id,
        email,
        isVerified,
      });

      return res.status(200).json({
        status: true,
        message: 'Login successful',
        token,
        user,
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: 'something went wrong',
        error: error.message,
      });
    }
  }
}
