import ChatMessage from '../db/models/chat-message.model';
import {getLogger} from '../config/logger';

const logger = getLogger('SOCKET/CHAT');

export default function initSession(io, socket) {
    return socket
        .on('chat', async details => {
            let store = socket._store;
            store.details = details;
            store.roomName = `${details.room}/${details.session_id}`;

            // Join session chat room
            socket.join(store.roomName);
            logger.info(`${store.user.login} joined ${store.roomName}`);

            // On disconnect log info
            socket.on('disconnect', () => {
                logger.info(`${store.user.login} left ${store.roomName}`);
            });

            // Send initial messages or disconnect on error
            try {
                store.session = await store.user.findSessionWithCharacter(details.session_id);
                const messages = await store.session.getChatMessages();
                socket.emit('chat', messages);
            } catch (err) {
                logger.error(`There was an error fetching data for user ${store.user.login}, session id ${details.session_id}`);
                logger.debug(err);
                socket.disconnect(); // TODO send error and leave chat room instead
                return;
            }

            // Handle socket events
            socket.on('chat/message', messageContent => sendMessage(messageContent, socket, io));
        });
}

async function sendMessage(messageContent, socket, io) {
    const { user, session, details, roomName } = socket._store;

    try {
        const message = await ChatMessage.insertAndFetchEssentials({
            message: messageContent,
            session_id: details.session_id,
            user_id: user.id,
            character_id: session.character && session.character.id
        });

        logger.info(`User ${user.login} sent message in ${session.id}:${session.name}`);
        io.to(roomName).emit('chat/message', message);
    } catch (err) {
        logger.debug(err);
        logger.error(`User ${user.login} couldn't send message in ${session.id}:${session.name}`);
    }
}
