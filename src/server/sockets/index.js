import socketIo from 'socket.io';
import SocketIoJwt from 'socketio-jwt';
import {getUserById} from '../db/models/user.model';
import chatSupport from './chat.socket';
import {getLogger} from '../config/logger';

const logger = getLogger('SOCKET');

export function init(https) {
    const io = socketIo(https, {
        serveClient: false
    });

    io
        .on('connection', SocketIoJwt.authorize({
            secret: process.env.SECRET,
            callback: 15000
        }))
        .on('authenticated', async socket => {
            const user = await getUserById(socket.decoded_token.id);
            socket._user = user;
            logger.info(`New user '${user.login}' connected.`);

            chatSupport(io, socket);

            socket
                .on('disconnect', () => {
                    logger.info(`User '${user.login}' disconnected.`);
                });
        });
}
