import * as socketIo from 'socket.io';
import * as SocketIoJwt from 'socketio-jwt';
import User from '../db/models/user.model';
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
            const user = await User.findById(socket.decoded_token.id);
            socket._store = { user };
            logger.info(`New user '${user.login}' connected.`);

            socket
                .on('disconnect', () => {
                    logger.info(`User '${user.login}' disconnected.`);
                });

            chatSupport(io, socket);
        });
}
