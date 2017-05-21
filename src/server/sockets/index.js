import socketIo from 'socket.io';
import passportSocketIo from 'passport.socketio';

export function init(https) {
    const io = socketIo(https, {
        serveClient: false
    });

    // io.use(passportSocketIo.authorize({
    //
    // }));

    io.on('connection', socket => {
        console.log('a user connected');
    });
}
