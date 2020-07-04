// import helperMethods from '../utils/helpers';

export default async (socket, io, user) => {
  // a user joins a room onces
  socket.on('make-connection', async (data) => {
    try {
      const { userTwoId } = data;

      const userOne = user.id;
      const userTwo = userTwoId;

      // check if the user has connection with the other user or create a new one
      const connection = await helperMethods.createConnection(userOne, userTwo);

      await socket.join(connection.id, () => {
        io.to(socket.id).emit('conversation', { connection });
        socket.on(`${connection.id}-message`, async (chat) => {
          const { message, parentId, file, senderName } = chat;
          const chatReturned = await helperMethods.saveChats({
            message,
            parentId,
            file,
            senderName,
            userOneId: user.id,
            userTwo: connection.id,
          });

          await io.to(connection.id).emit('conversation', { chatReturned });
        });
      });
    } catch (error) {
      io.to(socket.id).emit('error', { error });
    }
  });
};
