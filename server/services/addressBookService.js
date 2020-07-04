import models from '../database/models';
import BaseService from './baseService';

const { AddressBook } = models;

/**
 * @class AddressBookService
 */
export default class AddressBookService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(AddressBook);
  }
}

export const addressBookService = new AddressBookService();
