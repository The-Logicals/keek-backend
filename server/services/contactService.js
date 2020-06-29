import models from '../database/models';
import BaseService from './baseService';

const { Contact } = models;

/**
 * @class ContactService
 */
export default class ContactService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(Contact);
  }
}

export const contactService = new ContactService();
