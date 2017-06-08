import ChatMessage from '../db/models/chat-message.model';
import {getLogger} from '../config/logger';

const logger = getLogger('SOCKET/CHAT');

export default function initSession(io, socket) {
    return socket
        .on('chat', async details => {
            socket._details = details;
            socket._roomName = `${details.room}/${details.session_id}`;
            socket.join(socket._roomName);
            logger.info(`${socket._user.login} joined ${socket._roomName}`);

            socket.on('disconnect', () => {
                logger.info(`${socket._user.login} left ${socket._roomName}`);
            });

            let session, messages;
            try {
                session = await socket._user.findSession(details.session_id);
                messages = await session.getChatMessages();
            } catch (err) {
                logger.error(`There was an error fetching data for user ${socket._user.login}, session id ${details.session_id}`);
                logger.debug(err);
                socket.disconnect();
                return;
            }
            socket.emit('chat', messages);

            socket.on('chat/message', async messageContent => {
                const message = await ChatMessage.query().insert({
                    message: messageContent,
                    session_id: socket._details.session_id,
                    user_id: socket._user.id,
                    character_id: socket._user.id
                });

                logger.info(`User ${socket._user.login} sent message in ${session.id}:${session.name}`);
                io.to(socket._roomName).emit('chat/message', {
                    message: message.message,
                    sender: {
                        login: socket._user.login
                    },
                    sent_at: message.sent_at
                });
            });
        });
}
