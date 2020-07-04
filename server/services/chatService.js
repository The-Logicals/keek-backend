import models from '../database/models';
import BaseService from './baseService';

const { Chat } = models;

/**
 * @class ChatService
 */
export default class ChatService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(Chat);
  }
}

export const chatService = new ChatService();
