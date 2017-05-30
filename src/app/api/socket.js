import socketIo from 'socket.io-client';
import store from '../store';

export function getSocket(details) {
    const socket = socketIo();
    socket.on('connect', () => {
        socket
            .emit('authenticate', { token: store.state.account.token })
            .on('authenticated', () => {
                socket.emit('session', details);
                console.log('Socket authenticated');
            })
            .on('unauthorized', msg => {
                console.error('Socket unauthorized', msg.data);
                throw new Error(msg.data.type);
            });
    });

    return socket;
}
