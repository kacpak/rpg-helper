import socketIo from 'socket.io';
import SocketIoJwt from 'socketio-jwt';

export function init(https) {
    const io = socketIo(https, {
        serveClient: false
    });

    io
        .on('connection', SocketIoJwt.authorize({
            secret: process.env.SECRET,
            callback: 15000
        }))
        .on('authenticated', socket => {
            console.log(`New user (id: ${socket.decoded_token.id}) connected.`);
        });
}
