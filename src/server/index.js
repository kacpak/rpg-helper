import { start } from './server';

Promise.resolve()
    .then(start)
    .catch(e => console.error(e));
