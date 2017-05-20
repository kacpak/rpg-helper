const serverConfig = require('./config/webpack.server.config');
// const clientConfig = require('./config/webpack.client.config');

module.exports = env => {
    const environment = env && env.dev && 'dev' || 'prod';

    const server = serverConfig(environment);
    // const client = clientConfig(environment);

    return server;
    if (env) {
        if (env.serverOnly)
            return server;
        if (env.clientOnly)
            return client;
    }

    return [server, client];
};