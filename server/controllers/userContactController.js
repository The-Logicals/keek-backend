import { addressBookService } from '../services/addressBookService';
import models from '../database/models';

const { Contact, User } = models;

/**
 * @class userContactController
 */
export default class userContactController {
  /**
   * @method add
   * @description adds a new contact for a user
   * @param {*} req
   * @param {*} res
   * @returns {object} added contact
   */
  static async add(req, res) {
    try {
      const {
        contact: { id: contactId },
        user: { id: userId },
      } = req;

      const userContact = await addressBookService.create({
        userId,
        contactId,
      });

      return res.status(200).send({
        status: true,
        message: 'New contact added successfully',
        userContact,
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message:
          'Something went wrong while processing your request do try again later',
        error: error.message,
      });
    }
  }

  /**
   * @method remove
   * @param {object} req
   * @param {object} res
   * @returns {object} remove contact
   */
  static async remove(req, res) {
    try {
      const {
        params: { contactId },
        user: { id: userId },
      } = req;

      await addressBookService.delete({
        contactId,
        userId,
      });

      return res.status(200).send({
        status: true,
        message: 'contact deleted successfully',
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message:
          'Something went wrong while processing your request do try again later',
        error: error.message,
      });
    }
  }

  /**
   * @method getUsersAndContacts
   * @param {object} req
   * @param {object} res
   * @returns {object} user and users contacts
   */
  static async getUsersContacts(req, res) {
    try {
      const {
        user: { id: userId },
        query: { page, limit },
      } = req;

      let additionalData = {};
      let addressBook;
      const include = [
        {
          model: Contact,
          as: 'contacts',
          include: [{ model: User, as: 'user' }],
        },
      ];

      if (!(page && limit)) {
        addressBook = await addressBookService.findAll({ userId }, include);
      } else {
        const offset = limit * (page - 1);
        addressBook = await addressBookService.findAll(
          { userId },
          include,
          limit,
          offset
        );
        additionalData = { page, limit };
      }

      return res.status(200).send({
        status: 200,
        message: 'Get User and Contacts successful',
        data: addressBook,
        ...additionalData,
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message:
          'Something went wrong while processing your request do try again later',
        error: error.message,
      });
    }
  }
}
