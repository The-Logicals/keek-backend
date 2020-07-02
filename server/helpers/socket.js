import { chatService } from '../services/chatService';

import { connectionService } from '../services/connectionService';

const helperMethods = {
  async createConnection(userOneId, userTwoId) {
    const connectionId = await connectionService.findOrCreate({
      userOneId,
      userTwoId,
      where: {
        userOneId,
        userTwoId,
      },
    });

    const chats = await chatService.findAll({
      where: { connection_uuid: connectionId[0].dataValues.id },
    });

    return { id: connectionId[0].dataValues.id, chats };
  },

  async saveChats(data) {
    const chat = await chatService.create(data);
    return chat;
  },
};
export default helperMethods;
