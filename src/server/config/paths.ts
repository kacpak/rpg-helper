import { config } from 'dotenv';
config();

import * as path from 'path';
import * as mkdirp from 'mkdirp';
const root = path.resolve(__dirname, '../../..');
const dist = path.resolve(root, 'dist');

const paths = {
    root,
    dist,
    public: path.join(dist, 'public'),
    database: process.env.DATABASE_DIR || path.join(dist, 'database'),
    sslCert: process.env.SSL_CERT_DIR || path.join(root, 'sslcert')
};

mkdirp.sync(paths.database);

export default paths;
