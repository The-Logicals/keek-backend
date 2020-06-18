import { userService } from '../services/userService';

/**
 * @class AuthController
 */
export default class UserController {
  /**
   * @description - this method enables a user update their profile
   *
   * @param {object} req - The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   *
   * @returns {object} - object
   */
  static async updateProfile(req, res) {
    try {
      const {
        user: { id },
        body: { username, avatar, bio },
      } = req;

      const user = await userService.update(
        {
          username,
          avatar,
          bio,
        },
        { id }
      );

      return res.status(200).json({
        status: true,
        message: 'User profile updated successfully',
        user: user[1],
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message:
          'Something went wrong while processing your request do try again later',
        error,
      });
    }
  }

  /**
   * @description - this method returns a users profile
   *
   * @param {object} req - The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   *
   * @returns {object} - object
   */
  static async getUserProfile(req, res) {
    try {
      const {
        params: { id },
      } = req;

      const user = await userService.find({ id });

      return res.status(200).json({
        status: true,
        message: 'Profile returned successfully',
        user,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message:
          'Something went wrong while processing your request do try again later',
        error: error.message,
      });
    }
  }
}
