import * as express from 'express';
import * as fallback from 'express-history-api-fallback';
import * as path from 'path';

const router = express.Router();
const root: string = path.join('dist', 'public');

router.use('/', express.static(root));
router.use(fallback('index.html', { root }));

export default router;
