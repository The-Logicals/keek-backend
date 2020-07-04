import models from '../database/models';
import BaseService from './baseService';

const { Connection } = models;

/**
 * @class ConnectionService
 */
export default class ConnectionService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(Connection);
  }
}

export const connectionService = new ConnectionService();
