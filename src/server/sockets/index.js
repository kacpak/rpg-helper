import socketIo from 'socket.io';
import SocketIoJwt from 'socketio-jwt';
import User from '../db/models/user';
import chatSupport from './chat';
import {getLogger} from '../logger';

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
            const user = await User.findById(socket.decoded_token.id);
            socket._user = user;

            logger.info(`New user '${user.attributes.login}' connected.`);

            socket
                .on('disconnect', () => {
                    logger.info(`User '${user.attributes.login}' disconnected.`);
                });

            chatSupport(io, socket);
        });
}
