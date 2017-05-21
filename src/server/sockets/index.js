import socketIo from 'socket.io';
import passportSocketIo from 'passport.socketio';

export function init(https, sessionOptions) {
    const io = socketIo(https, {
        serveClient: false
    });

    io.use(passportSocketIo.authorize({
        store: sessionOptions.store,
        key: sessionOptions.key,
        secret: sessionOptions.secret
    }));

    io.on('connection', socket => {
        console.log(`New user (${socket.request.user.login}) connected.`);
    });
}
