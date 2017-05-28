import fs from 'fs';
import path from 'path';
import paths from '../paths';

const files = {
    key: path.join(paths.sslCert, 'private.key'),
    cert: path.join(paths.sslCert, 'certificate.pem')
};

if (!fs.existsSync(files.key)) {
    throw `[SSL] Couldn't locate private.key file in ${files.key}!`;
}

if (!fs.existsSync(files.cert)) {
    throw `[SSL] Couldn't locate SSL certificate ${files.cert}!`;
}

export const credentials = {
    key: fs.readFileSync(files.key),
    cert: fs.readFileSync(files.cert)
};
