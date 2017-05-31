import ChatMessage from '../db/models/chat-message';
import Session from '../db/models/session';
import {getLogger} from '../logger';

const logger = getLogger('SOCKET/CHAT');

export default function initSession(io, socket) {
    return socket
        .on('chat', async details => {
            socket._details = details;
            socket._roomName = `${details.room}/${details.session_id}`;
            socket.join(socket._roomName);
            logger.info(`${socket._user.attributes.login} joined ${socket._roomName}`);

            const session = await Session.findById(details.session_id);
            const messages = await session.related('chatMessages').fetch({withRelated: ['sender']});
            socket.emit('chat', messages);

            socket.on('chat/message', async messageContent => {
                const message = await ChatMessage.create({
                    message: messageContent,
                    sent_at: Date.now(),
                    session_id: socket._details.session_id,
                    sender_id: socket._user.attributes.id
                });

                io.to(socket._roomName).emit('chat/message', {
                    message: message.attributes.message,
                    sender: {
                        login: socket._user.attributes.login
                    },
                    sent_at: message.attributes.sent_at
                });
            });
            socket.on('disconnect', () => {
                logger.info(`${socket._user.attributes.login} left ${socket._roomName}`);
            });
        });
}
