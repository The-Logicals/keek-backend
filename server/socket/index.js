import Authenticate from '../helpers/auth';
import connection from './connection';

export default (io) => {
  if (io) {
    io.on('connection', async (socket) => {
      console.log('made socket connection', socket.id);
      let user;
      const { handshake } = socket;
      socket.on('authenticate', async (data) => {
        try {
          const { token } = data;
          user = await Authenticate.socketAuth(token, socket, io);
        } catch (error) {
          console.log(error);
        }
      });
      if (handshake.headers.token) {
        const { token } = handshake.headers;
        if (token) {
          user = await Authenticate.socketAuth(token, socket, io);
        }
      }
      // handle other processes here
      connection(socket, io, user);
      // Disconnect event
      socket.on('disconnect', () => {
        // handle user disconnection
      });
    });
  }
};
