import socketIo from 'socket.io';
import SocketIoJwt from 'socketio-jwt';
import User from '../db/models/user';
import ChatMessage from '../db/models/chat-message';
import Session from '../db/models/session';

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
            console.log(`New user "${user.attributes.login}" connected.`);

            socket
                .on('session', async details => {
                    socket._details = details;

                    const session = await Session.findById(details.session.id);
                    const messages = await session.related('chatMessages').fetch({withRelated: ['sender']});
                    socket.emit('session', messages);
                })
                .on('chat message', async msg => {
                    const message = await ChatMessage.create({
                        message: msg,
                        sent_at: Date.now(),
                        session_id: socket._details.session.id,
                        sender_id: user.attributes.id
                    });

                    // TODO: Ogranicz emit do pokoju, bo w bazie jest ok, ale wszyscy dostają nowe wiadomości
                    io.emit('chat message', {
                        message: msg,
                        sender: {
                            login: user.attributes.login
                        },
                        sent_at: message.attributes.sent_at
                    });
                })
                .on('disconnect', () => {
                    console.log(`User disconnected.`);
                });
        });
}
