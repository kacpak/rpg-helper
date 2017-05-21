import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
const root = path.resolve(__dirname, '..');
const dist = path.resolve(root, 'dist');

export default {
    root,
    dist,
    public: path.join(dist, 'public'),
    database: path.join(dist, 'database.sqlite'),
    sslCert: process.env.SSL_CERT_DIR || path.join(root, 'sslcert')
};
