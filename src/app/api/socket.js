import socketIo from 'socket.io-client';
import store from '../store';

export function getSocket(initEvent, details) {
    const socket = socketIo();
    socket.on('connect', () => {
        socket
            .emit('authenticate', { token: store.state.account.token })
            .on('authenticated', () => {
                console.log('Socket authenticated');
                socket.emit(initEvent, details);
            })
            .on('unauthorized', msg => {
                console.error('Socket unauthorized', msg.data);
                throw new Error(msg.data.type);
            });
    });

    return socket;
}
