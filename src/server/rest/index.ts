import * as express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.json({msg: 'I love you'}));

export default router;
