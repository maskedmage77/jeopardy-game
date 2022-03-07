import { Server } from 'Socket.IO'
import Game from '../../types/Game'

const SocketHandler = (req: any, res: any) => {

  if (res.socket.server.io) {

    console.log('Socket is already running')

  } else {
    
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io;
    let game: Game;

    io.on('connection', socket => {
      console.log("TEST");

      socket.on('clue-selected', data => {
        // socket.broadcast.emit('clue-selected', msg)
        io.sockets.emit('display_clue', data);
      });

      socket.on('game_created', data => {
        game = data
      });

      socket.on("request_game", () => {
        socket.emit('update_game', game)
      });

    });
  }
  res.end()
}

export default SocketHandler