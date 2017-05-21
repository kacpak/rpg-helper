import fs from 'fs';
import path from 'path';

const sslCertDir = path.resolve(__dirname, '..', 'sslcert');
const files = {
    key: path.join(sslCertDir, 'private.key'),
    cert: path.join(sslCertDir, 'certificate.pem')
};

if (!fs.existsSync(files.key)) {
    throw `Couldn't locate ${files.key} for SSL support!`;
}

if (!fs.existsSync(files.cert)) {
    throw `Couldn't locate ${files.cert} for SSL support!`;
}

export const credentials = {
    key: fs.readFileSync(files.key),
    cert: fs.readFileSync(files.cert)
};
